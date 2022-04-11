import React, { useEffect, useState } from "react";
import { DispatchOrderForm, OrderEstimateInfo } from "./Component";
import { Api } from "../../utils/Api";
import { useParams, useNavigate } from "react-router";
import routes from "../../utils/Routes";

export default function OrderDetailList() {
  const { id } = useParams();
  const [datas, setDatas] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const response = await Api.get(`estimate/list/o/${id}`);
        console.log("RES", response);
        const {
          data: { estimate, order },
        } = response;
        setDatas(() => ({
          estimate,
          order,
        }));
      } catch (err) {
        console.log("err");
      }
    }
    getData();
  }, []);

  function Content({ filter }) {
    let cnt = -1;

    const onClickCreate = async (order, estimate) => {
      console.log("order, estimate", order, estimate);
      const data = {
        order,
        selected_estimate: estimate,
      };
      try {
        const result = await Api.post("dispatch", data);
        window.alert("견적 선택완료");
      } catch (err) {
        console.log("ERR", err);
      }
    };

    const onClickChat = async (id) => {
      let roomId = "";
      try {
        const response = await Api.post(routes.createRoom, {
          driverorcompany: id,
        });
        console.log("RES", response);
        roomId = response.data.room_id;
      } catch (err) {
        console.log("ERR", err.response);
        if (err.response.status === 301) {
          console.log("RRR", 301);
          roomId = err.response.data.room_id;
        }
      }
      navigate(routes.chat(roomId));
    };

    const onClick = (id) => {
      console.log("ID", id);
      navigate(routes.orderEstimateDetail(id));
    };

    const dataContent =
      datas.estimate &&
      datas.estimate.map((data, idx) => {
        console.log("data", data);
        const { order } = datas;

        const startDate = new Date(filter.startDate);
        const finishDate = new Date(filter.finishDate);
        const departureDate = new Date(order.departure_date);

        if (filter.departure && !order.departure.includes(filter.departure)) {
          console.log("1", order.departure.includes(filter.departure));
          return <></>;
        } else if (filter.arrival && !order.arrival.includes(filter.arrival)) {
          console.log("2");
          return <></>;
        } else if (filter.startDate && !(departureDate >= startDate)) {
          console.log("3");
          return <></>;
        } else if (filter.finishDate && !(departureDate <= finishDate)) {
          console.log("4");
          return <></>;
        } else if (filter.total_number && !order.total_number) {
          console.log("5");
          return <></>;
        } else if (filter.total_number + 10 && !order.total_number) {
          console.log("6");
          return <></>;
        } else if (
          filter.total_number &&
          !(order.total_number >= filter.total_number)
        ) {
          console.log("5");
          return <></>;
        } else if (
          filter.total_number &&
          !(order.total_number < parseInt(filter.total_number) + 10)
        ) {
          console.log("6");
          return <></>;
        } else {
          cnt = cnt + 1;
          const dataObject = {
            ...data,
            order: datas.order,
          };
          return (
            <div
              key={idx}
              onClick={() => {
                onClick(data.id);
              }}
            >
              <OrderEstimateInfo data={dataObject} />
            </div>
          );
        }
      });
    return <div class="mainContentsArea">{dataContent}</div>;
  }
  return (
    <>
      {datas.order && (
        <DispatchOrderForm Content={Content} order={datas.order} />
      )}
    </>
  );
}
