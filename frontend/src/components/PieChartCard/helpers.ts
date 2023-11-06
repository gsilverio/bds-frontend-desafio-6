import { ApexOptions } from "apexcharts";

export const buildPieChartConfig = (labels: string[] = [], name: string) => {
  return {
    labels,
    noData: {
      text: "Sem resultados",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "#8D8D8D",
        fontSize: "18px",
        fontFamily: "Roboto, sans-serif",
      },
    },
    colors: ["#FF7A00", "#7234F5", "#FF0000"],
    legend: {
      show: true,
      floating: false,
      position: "bottom",
      offsetY: 20,
      labels: {
        colors: "#8D8D8D",
      },
      fontFamily: "Roboto, sans-serif",
      fontSize: "18px",
      itemMargin: {
        vertical: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        size: 300,
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 10,
              formatter: function () {
                return name;
              },
              color: "#8D8D8D",
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: "24px",
              color: "#8D8D8D",
              fontFamily: "Roboto, sans-serif",
              formatter: function () {
                return "";
              },
            },
          },
        },
      },
    },
    chart: {
      height: "400px",
    },
  } as ApexOptions;
};
