import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
import { Context } from "./index";


export let Role = null;

export const registration = async (identifier, password) => {
  const { data } = await $host.post("auth/signup", {
    identifier,
    password,
  });
  localStorage.setItem("token", data.token);

  return jwtDecode(data.token);
};

export const doctorregistration = async (firstName, secondName, lastName,  login, password, email, phoneNumber, birthdate, address, snils, polis, passport, age, specialityId) => {
  try {
    console.log("Параметры переданные в функцию:");
    console.log({
      firstName,
      secondName,
      lastName,
      login,
      password,
      email,
      phoneNumber,
      birthdate,
      address,
      snils,
      polis,
      passport,
      age,
      specialityId,
    });

    const { data } = await $host.post("auth/doctor/signup", {
      firstName,
      secondName,
      lastName,
      login,
      password,
      email,
      phoneNumber,
      birthdate,
      address,
      snils,
      polis,
      passport,
      age,
      specialityId,
    });
  
    console.log("Результат запроса:");
    console.log(data);
  } catch (error) {
    console.error("Произошла ошибка:");
    console.error(error);
  }
};



export const login = async (identifier, password) => {
  const { data } = await $authHost.post("auth/signin", { identifier, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  Role = data.role; // Assigning the value of Role
  console.log(data.token);
  console.log(Role);

};

export const check = async () => {


};




