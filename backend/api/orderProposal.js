import express from "express";
import { orderModel } from "../config/models/orderModels.js";
import { UserSignupData } from "../config/models/userProfileLoginData.js";
import { worker_profile_schema } from "../config/models/worker_profile_schema.js";
export const orderRouter = express.Router();
orderRouter.post("/order_proposal", async (req, res) => {
  try {
    let proposalData = req.body;
    let userEmail = req.cookies.userEmail || req.session?.loginData?.userEmail;
    console.log(userEmail, proposalData);

    let orderBy = await UserSignupData.findOne(
      {
        userEmail,
      },
      { _id: 1 }
    ).lean();
    console.log(orderBy._id.toString(), "SAJAS");

    let getEmail = await worker_profile_schema.findOne(
      {
        _id: proposalData.orderTo,
      },
      { _id: 0, useremail: 1 }
    );
    console.log(getEmail.useremail, "EMAIL");
    let getIdTo = await UserSignupData.findOne(
      {
        userEmail: getEmail.useremail,
      },
      { _id: 1 }
    );
    console.log(getIdTo, "getIdTo");
    let storeProposal = await orderModel.create({
      orderFrom: orderBy._id.toString(),
      orderTo: getIdTo._id.toString(),
      orderType: proposalData.orderType,
      orderPrice: proposalData.orderPrice,
      orderDescription: proposalData.orderDescription,
    });
    console.log(storeProposal, "storeProposal");
    res.status(200).json({
      status: !!storeProposal,
      message: "Order proposal sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
});
orderRouter.get("/get_order_detail", async (req, res) => {
  let reqQuery = req.query;
  console.log("reqQuery");
  console.log(reqQuery);

  let query = {};
  if (reqQuery.project === "true") {
    query.orderFrom = reqQuery.orderId;
  } else if (reqQuery.order === "true") {
    query.orderTo = reqQuery.orderId;
  }
  let getAllOrdersData = await orderModel.find(query).lean();
  // console.log(getAllOrdersData);
  let allOrderData = [];
  let isWorker = false;
  await Promise.all(
    getAllOrdersData.map(async (eachOrder) => {
      let getIdForPersonalData = "";
      if (reqQuery.project === "true") {
        getIdForPersonalData = eachOrder.orderFrom.toString();
      } else if (reqQuery.order === "true") {
        getIdForPersonalData = eachOrder.orderTo.toString();
      }
      let getUserData = await UserSignupData.findOne(
        {
          _id: getIdForPersonalData,
        },
        { _id: 0, userImageUniqueId: 1, userEmail: 1, userName: 1 }
      );
      let getReqEmail = await UserSignupData.findOne(
        {
          _id: reqQuery.orderId,
        },
        { _id: 0, userEmail: 1 }
      );
      let getUserName = await worker_profile_schema.findOne(
        {
          useremail: getUserData?.userEmail,
        },
        { _id: 0, username: 1, profession: 1 }
      );
      let checkWorker = await worker_profile_schema.findOne(
        {
          useremail: getReqEmail.userEmail,
        },
        { _id: 0, username: 1, profession: 1 }
      );
      checkWorker ? isWorker = true : isWorker = false;
      if (getUserData) {
        allOrderData.push({
          orderFrom: eachOrder.orderFrom,
          orderTo: eachOrder.orderTo,
          orderId: eachOrder._id,
          orderType: eachOrder.orderType,
          orderPrice: eachOrder.orderPrice,
          orderDescription: eachOrder.orderDescription,
          orderDateTime: eachOrder.updatedAt,
          orderToDp: getUserData.userImageUniqueId,
          orderToEmail: getUserData.userEmail,
          orderToUserName: getUserName?.username || getUserData.userName,
          orderToProfession: getUserName?.profession || "Client",
          orderStatus: eachOrder.orderStatus,
        });
      } else {
        allOrderData.push({
          orderFrom: eachOrder.orderFrom,
          orderId: eachOrder._id,
          orderType: eachOrder.orderType,
          orderPrice: eachOrder.orderPrice,
          orderDescription: eachOrder.orderDescription,
          orderDateTime: eachOrder.updatedAt,
          orderStatus: eachOrder.orderStatus,
        });
      }
    })
  );
  console.log(allOrderData);
  // allOrderData.push()
  res.status(200).json({
    status: allOrderData.length > 0,
    orderData: allOrderData.length > 0 ? {allOrderData, isWorker} : null,
    // orderData: allOrderData.length > 0 ? allOrderData : null,
  });
});
orderRouter.patch("/cancel_order", async (req, res) => {
  console.log(req.body);
  let deleteReq = await orderModel.updateOne(
    { _id: req.body?.orderId },
    {
      orderStatus: "cancel",
    }
  );
  res.status(200).json({ status: deleteReq.acknowledged });
});
orderRouter.patch("/complete_order", async (req, res) => {
  console.log(req.body);
  if (req.cookies.userEmail || req.session?.loginData?.userEmail) {
    let deleteReq = await orderModel.updateOne(
      { _id: req.body?.orderId },
      {
        orderStatus: "complete",
      }
    );
    res.status(200).json({ status: deleteReq.acknowledged });
  } else {
    res.status(200).json({ status: false, message: "UnAuthorized User!" });
  }
});
orderRouter.patch("/accept_order", async (req, res) => {
  console.log(req.body);
  if (req.cookies.userEmail || req.session?.loginData?.userEmail) {
    let deleteReq = await orderModel.updateOne(
      { _id: req.body?.orderId },
      {
        orderStatus: "accept",
      }
    );
    res.status(200).json({ status: deleteReq.acknowledged });
  } else {
    res.status(200).json({ status: false, message: "UnAuthorized User!" });
  }
});
