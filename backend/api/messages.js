import express from "express";
import { contactConnections } from "../config/models/contactConnections.js";
import { worker_profile_schema } from "../config/models/worker_profile_schema.js";
import { UserSignupData } from "../config/models/userProfileLoginData.js";
import { contactMessagingModelSchema } from "../config/models/contactConnectionMessages.js";
export const contactMessageRouter = express.Router();
contactMessageRouter.get("/add-contact", async (req, res) => {
  let queryData = req.query;
  // console.log(queryData, "queryData");
  console.log(queryData.userId ,queryData.contactId);
  
  // console.log(queryData.userId && queryData.contactId);
  if (queryData.userId && queryData.contactId) {
    let getId = "";
    let getEmail = await worker_profile_schema.findOne(
      {
        _id: queryData.contactId,
      },
      { _id: 0, useremail: 1 }
    );
    if (getEmail) {
      let Id = await UserSignupData.findOne(
        {
          userEmail: getEmail.useremail,
        },
        { _id: 1 }
      );
      if (Id) {
        getId = Id._id;
      } else {
        getId = queryData.contactId;
      }
    } else {
      getId = queryData.contactId;
    }
    let insertContactConnection = await contactConnections.updateOne(
      {
        $or: [
          { userId: { $eq: queryData.userId }, contactId: { $eq: getId } },
          { userId: { $eq: getId }, contactId: { $eq: queryData.userId } },
        ],
        // contactId: { $eq: queryData.contactId },
      },
      {
        $setOnInsert: {
          userId: queryData.userId,
          contactId: getId,
        },
      },
      { upsert: true }
    );
    console.log(insertContactConnection, "hi");
    
    if (insertContactConnection.acknowledged) {
      res.json({ status: insertContactConnection, dataSet: true });
    } else {
      res.json({ status: insertContactConnection, dataSet: false });
    }
  } else {
    res.json({ status: null, dataSet: false });
  }
});
contactMessageRouter.get("/contact-connections", async (req, res) => {
  try {
    let { userId } = req.query;
    // console.log(userId);
    
    // console.log(userId);
    let allConnections = await contactConnections.find({
      $or: [{ userId }, { contactId: userId }],
    });
    // console.log(allConnections, "hsi");
    let completeData = (
      await Promise.all(
        allConnections.map(async (eachData, eachIndex) => {
          let userAccountEmail = await worker_profile_schema.findOne(
            {
              _id:
                userId === eachData.contactId
                  ? eachData.userId
                  : eachData.contactId,
            },
            { useremail: 1 }
          );
          let userSignupData = await UserSignupData.findOne(
            { userEmail: userAccountEmail?.useremail },
            { userImageUniqueId: 1, userEmail: 1, userName: 1 }
          );
          // console.log(userSignupData, userAccountEmail?.useremail);
          
          if (!userSignupData) {
            // If email not found, try by _id
            let targetId = userId === eachData.contactId ? eachData.userId : eachData.contactId;
            userSignupData = await UserSignupData.findOne(
              { _id: targetId },
              { userImageUniqueId: 1, userEmail: 1, userName: 1 }
            );
          }
          console.log(userSignupData, 'asd', userId === eachData.contactId
            ? eachData.userId
            : eachData.contactId, userAccountEmail, userAccountEmail ? userAccountEmail._id : userId === eachData.contactId ? eachData.userId : eachData.contactId);
          
          if (!userSignupData) return null;
          let workerContactData = await worker_profile_schema
            .findOne(
              { useremail: userSignupData.userEmail },
              { username: 1, profession: 1, useremail: 1, _id: 1 }
            )
            .lean();
          if (workerContactData) {
            return {
              ...workerContactData,
              userImageUniqueId: userSignupData?.userImageUniqueId,
              workerId: workerContactData?._id,
              _id: userSignupData?._id,
            };
          } else {
            return {
              userImageUniqueId: userSignupData?.userImageUniqueId,
              profession: "Client",
              username: userSignupData?.userName,
              useremail: userSignupData?.userEmail,
              _id: userSignupData?._id,
            };
          }
        })
      )
    ).filter((each) => each !== null);
    // console.log(completeData, "hi");
    
    res.json({
      status: completeData.length > 0,
      contactConnectionsData: completeData,
    });
  } catch (error) {
    console.error("Error fetching contact connections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
contactMessageRouter.get("/get-messages", async (req, res) => {
  let { userId, contactId } = req.query;
  // console.log(req.query);
  let userMessages = await contactMessagingModelSchema
    .find({
      $or: [
        { messageFrom: userId, messageTo: contactId },
        { messageFrom: contactId, messageTo: userId },
      ],
    })
    .sort({ createdAt: 1 });
  // console.log(userMessages);
  res
    .status(200)
    .json({ dataStatus: userMessages.length > 0, messagesData: userMessages });
});
contactMessageRouter.post("/set-messages", async (req, res) => {
  let { userId, contactId, messageText } = req.body;
  // console.log(req.body);
  if (!userId || !contactId || !messageText) {
    return res.status(200).json({
      messageStatus: false,
      message: null,
    });
  }
  let getEmail = await worker_profile_schema.findOne(
    {
      _id: contactId,
    },
    { _id: 0, useremail: 1 }
  );
  if (getEmail) {
    let getId = await UserSignupData.findOne(
      {
        userEmail: getEmail.useremail,
      },
      { _id: 1 }
    );
    let userMessages = await contactMessagingModelSchema.insertOne({
      messageFrom: userId,
      messageTo: getId._id,
      message: messageText,
    });
    res.status(200).json({
      messageStatus: !!userMessages,
      message: userMessages?.message,
    });
  } else {
    let userMessages = await contactMessagingModelSchema.insertOne({
      messageFrom: userId,
      messageTo: contactId,
      message: messageText,
    });
    res.status(200).json({
      messageStatus: !!userMessages,
      message: userMessages?.message,
    });
  }
});
contactMessageRouter.delete("/del-contact", async (req, res) => {
  let { userId, contactId } = req.query;
  let deleteContactConnections = await contactConnections.deleteOne({
    $or: [
      { userId, contactId },
      { userId: contactId, contactId: userId },
    ],
  });
  console.log(deleteContactConnections);
  if (
    deleteContactConnections.acknowledged &&
    deleteContactConnections.deletedCount > 0
  ) {
    let deleteContactMessages = await contactMessagingModelSchema.deleteMany({
      $or: [
        { messageFrom: userId, messageTo: contactId },
        { messageFrom: contactId, messageTo: userId },
      ],
    });
    console.log(deleteContactMessages);

    res.status(200).json({
      deleteContact: deleteContactMessages.acknowledged,
    });
  } else {
    res.status(200).json({
      deleteContact: deleteContactConnections.acknowledged,
    });
  }
});