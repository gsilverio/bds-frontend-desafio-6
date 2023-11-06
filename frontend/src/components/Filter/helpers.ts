import { Gender } from "../../models/Gender";
import { ByGender } from "../../models/SalesByGender";

const formatGender = (gender: Gender) => {
  const textByGender = {
    MALE: "Masculino",
    FEMALE: "Feminino",
    OTHER: "Outro",
  };
  return textByGender[gender];
};

export const buildGenderChart = (genders: ByGender[]) => {
  const labels = genders.map((gender) => formatGender(gender.gender as Gender));
  const series = genders.map((gender) => gender.sum);

  return {
    labels,
    series,
  };
};
