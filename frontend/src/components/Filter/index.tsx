import "./styles.css";
import Select from "react-select";
import { Sales } from "../../models/stores";
import { useCallback, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../../util/requests";
import PieChartCard from "../PieChartCard";
import { PieChartConfig } from "../../models/SalesByGender";
import { buildGenderChart } from "./helpers";
import { SummarySales } from "../../models/summarySales";

function Filter() {
  const [sales, setSales] = useState<Sales[]>([]);
  const [gender, setGender] = useState<PieChartConfig>();
  const [infoSales, setInfoSales] = useState<SummarySales>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/stores",
    };
    requestBackend(config).then((response) => {
      setSales(response.data);
    });
  }, []);

  const setSelectStore = useCallback((storeSelected: Number) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/sales/by-gender",
      params: {
        storeId: storeSelected,
      },
    };

    const confiSum: AxiosRequestConfig = {
      method: "GET",
      url: "/sales/summary",
      params: {
        storeId: storeSelected,
      },
    };

    requestBackend(config).then((response) => {
      const newGenders = buildGenderChart(response.data);
      setGender(newGenders);
    });
    requestBackend(confiSum).then((response) => {
      setInfoSales(response.data);
    });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="main-filter-container">
      <div className="base-card select-card">
        <Select
          options={sales}
          classNamePrefix="filter-select"
          onChange={(x) => {
            setSelectStore(x?.id as number);
          }}
          getOptionLabel={(obj) => obj.name}
          getOptionValue={(obj) => String(obj.id)}
          isClearable
        />
      </div>
      <div className="main-filterContent base-card">
        {infoSales ? (
          <div className="infoSummarySales-container">
            <h2>{formatPrice(infoSales?.sum as number)}</h2>
            <span>Total de vendas</span>
          </div>
        ) : (
          ""
        )}
        <div className="piechart-container">
          <PieChartCard
            name=""
            labels={gender?.labels}
            series={gender?.series}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
