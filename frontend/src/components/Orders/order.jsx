import { useContext, useEffect, useState } from "react";
import { Main_context } from "../../stores/main_store/main_store";
import { OrderShowBox } from "./components/orderShowBox";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./../Loading/loading";
import { Un_found_page } from "../404/un_found_page";
export function Order() {
  const context = useContext(Main_context);
  let [isWorker, setIsWorker] = useState(false);
  let [isProject, setIsProject] = useState(true);
  async function getOrderDetail() {
    context.uiStates.setLoadingState(true);
    try {
      console.log("try");

      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get_order_detail?orderId=${
          context.account.user_id
        }&project=${isProject}&order=${isWorker}`,
        {
          withCredentials: true,
        }
      );
      context.uiStates.setLoadingState(false);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  const getOrderDetailMutation = useMutation({
    mutationFn: getOrderDetail,
    mutationKey: ["getOrderDetail"],
  });
  useEffect(() => {
    console.log(
      !context.uiStates?.workerProfileData?.username,
      "testing",
      context.uiStates?.workerProfileData?.username
    );

    // setIsWorker(!context.uiStates?.workerProfileData?.username);
  }, [context.uiStates?.workerProfileData]);
  // console.log(getOrderDetailMutation.data);
  useEffect(() => {
    console.log(getOrderDetailMutation.data);
  }, [getOrderDetailMutation.data]);
  useEffect(() => {
    if (context.account?.user_id) {
      getOrderDetailMutation.mutate();
    }
  }, [context.account?.user_id]);
  useEffect(() => {
    console.log(context.uiStates.workerProfileData);
  }, [context.uiStates.workerProfileData])
  
  return (
    <>
      {context.account.login || context.account.signup ? (
        <>
          <section className="w-full h-auto min-h-screen flex items-start justify-center bg-main_website_color_2 px-4 sm:px-6 lg:px-8 py-6">
            {context.uiStates.loadingState ? (
              <Loading loadingMessage="Loading Orders" />
            ) : null}

            <div className="w-full max-w-[1440px] h-full pt-6 flex flex-col items-center justify-start gap-6">
              {/* Buttons */}
              <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start border gap-4 sm:gap-[35px] px-2 sm:px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    if (context.account.user_id) {
                      setIsProject(true);
                      setIsWorker(false);
                      getOrderDetailMutation.mutate();
                    }
                  }}
                  className={`w-full sm:w-auto border-2 border-top_nav_second_color rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base cursor-pointer transition-all duration-150 ${
                    isProject
                      ? "bg-top_nav_second_color text-main_website_color_1"
                      : "bg-transparent text-top_nav_second_color"
                  } hover:bg-top_nav_second_color/10 hover:text-top_nav_second_color hover:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Your Projects
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsWorker(true);
                    setIsProject(false);
                    getOrderDetailMutation.mutate();
                  }}
                  disabled={context.uiStates.workerProfileData.id ? false: true}
                  // disabled={!getOrderDetailMutation.data?.orderData?.isWorker}
                  className={`w-full sm:w-auto border-2 border-top_nav_second_color rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base cursor-pointer transition-all duration-150 ${
                    !isProject
                      ? "bg-top_nav_second_color text-main_website_color_1"
                      : "bg-transparent text-top_nav_second_color"
                  } ${
                    isWorker ? ""
                      : "hover:bg-top_nav_second_color/10 hover:scale-[0.97] hover:text-top_nav_second_color"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Client Orders
                </button>
              </div>

              {/* Orders */}
              <div className="w-full flex flex-col items-center justify-start gap-6 mt-4">
                {getOrderDetailMutation.data?.status
                  ? getOrderDetailMutation.data?.orderData?.allOrderData.map(
                      (eachOrder, idx) => {
                        const date = new Date(eachOrder?.orderDateTime);
                        
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const year = date.getFullYear();
                        const time = date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        });
                        const formatted = `${day}-${month}-${year} - ${time}`;
                        return (
                          <>
                            <OrderShowBox
                              key={Date.now() + idx}
                              type={eachOrder?.orderType}
                              isProject={isProject}
                              isWorker={isWorker}
                              description={eachOrder?.orderDescription}
                              price={eachOrder?.orderPrice}
                              orderId={eachOrder?.orderId}
                              orderFrom={eachOrder?.orderFrom}
                              mutation={getOrderDetailMutation}
                              orderTo={eachOrder?.orderTo}
                              clientName={eachOrder?.orderToUserName}
                              profession={eachOrder?.orderToProfession}
                              status={eachOrder?.orderStatus}
                              dp={eachOrder?.orderToDp}
                              dateTime={formatted}
                            />
                          </>
                        );
                      }
                    )
                  : null}
              </div>
            </div>
          </section>
        </>
      ) : (
        <Un_found_page />
      )}
    </>
      // </>
  );
}
