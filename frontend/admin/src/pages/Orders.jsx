import React, { useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ordersGrid } from "../data/dummy";

import { Header } from "../components";
import { useAuthContext } from "../contexts/AuthContext";

const Orders = () => {
  const { authState, getOrders } = useAuthContext();
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <div className="m-2 md:m-10 p2 md:p-10 bg-white rounded-3xl">
      <Header title="Orders" category="Page" />
      <GridComponent
        id="gridcomp"
        dataSource={authState.orders}
        allowPaging
        allowSorting
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;
