class AddressBookContact {

    constructor(id, name, phone, address, city, state, zip) {
        this.id;
        this.name;
        this.phone;
        this.address;
        this.city;
        this.state;
        this.zip;
    }
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        this._phone = phone;
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get city() {
        return this._city;
    }

    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
    }

    get zip() {
        return this._zip;
    }

    set zip(zip) {
        this._zip = zip;
    }

    toString() {
        return (
            "[ id: " + this.id +
            ", name: " + this.name +
            ", phone: " + this.phone +
            ", address: " + this._address +
            ", state: " + this.state +
            ", city: " + this.city +
            ", zip: " + this._zip + " ]" + "\n"
          );
    }
}