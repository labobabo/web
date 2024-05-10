import { makeAutoObservable } from "mobx";

export default class DoctorStore {
  constructor() {
    this._isAuth = false;
    this._doctor = {};
    makeAutoObservable(this);
  }
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setDoctor(doctor) {
    this._doctor = doctor;
  }
  get isAuth() {
    return this._isAuth;
  }
  get doctor() {
    return this._doctor;
  }
}
