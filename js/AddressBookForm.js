let isUpdate = false;
let contactAddressBookObject = {};

//OnChange of State showing cities
const stateDropdown = document.getElementById('state');
const cityDropdown = document.getElementById('city');

const citiesByState = {
    Delhi: ['Delhi'],
  chattisgarh: ['Raipur', 'Korba', 'Mandla'],
  'Punjab': ['Mohali', 'chandigarh', 'amritsar',],
  MadhyaPradesh: ['Jabalpur', 'bhopal', 'gwalior','indore'],
  UttarPradesh: ['Aligarh', 'Lucknow', 'Kanpur', 'Pryagraj'], 
  Telangana: ['Hyderabad', 'Khammam', 'Warangal', 'Rangareddy'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur','Nashik'],
  'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Durgapur'],
  Karnataka: ['Bengaluru', 'Ballari', 'Bidar','Udupi'],
  TamilNadu: ['Chennai', 'Coimbatore', 'Madurai', 'Kanyakumari'], 
};

stateDropdown.addEventListener('change', function() {
  const selectedState = stateDropdown.value;
  const cities = citiesByState[selectedState];
  cityDropdown.innerHTML = '';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'City';
  cityDropdown.add(defaultOption);
  if (cities) {
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.text = city;
      cityDropdown.add(option);
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
//Name Validation
const name = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
name.addEventListener('input', function() {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}([ ][A-Z]{1}[a-z]{0,})?$');
    if (nameRegex.test(name.value)) nameError.textContent = "";
    else nameError.textContent = "Name is Incorrect";
})

//Phone Number Validation
const phone = document.querySelector('#phone');
const phoneError = document.querySelector('.phone-error');
phone.addEventListener('input', function() {
    let phoneRegex = RegExp('^[0-9]{10}$');
    if (phoneRegex.test(phone.value)) phoneError.textContent = "";
    else phoneError.textContent = "Phone Number is Incorrect. Enter 10 digit mobile number";
})

//Address Validation
const address = document.querySelector('#address');
const addressError = document.querySelector('.address-error');
address.addEventListener('input', function() {
    let addressRegex = RegExp('.*');
    if (addressRegex.test(address.value)) addressError.textContent = "";
    else addressError.textContent = "Address is Incorrect";
})

checkForUpdate();
});

const createAddressBookObject = () => {
    let contactData = new AddressBookContact();
    try {
        contactData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.name-error', e);
        throw e;
    }

    contactData.name = getInputValueById('#name');
    contactData.phone = getInputValueById('#phone');
    contactData.address = getInputValueById('#address');
    contactData.city = getInputValueById('#city');
    contactData.state = getInputValueById('#state');
    contactData.zip = getInputValueById('#zip');
    contactData._id = createContactId();    
    alert(contactData.toString());
    return contactData;
};

// const createAddressBookObject = (id) => {
//     let contactData = new AddressBookContact();
//     if (!id) contactData._id = createContactId();
//     else contactData._id = id;
//     setAddressBookContactObject(contactData);
//     return contactData;
// };

//on submit
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookContactObject();
        CreateAndUpdateLocalStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
};

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};

const setAddressBookContactObject = () => {
    contactAddressBookObject._name = getValue("#name");
    contactAddressBookObject._phone = getValue("#phone");
    contactAddressBookObject._address = getValue("#address");
    contactAddressBookObject._state = getValue("#state");
    contactAddressBookObject._city = getValue("#city");
    contactAddressBookObject._zip = getValue("#zip");
};

// function UpdateLocalStorage(contactData) {
//     let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
//     if (addressBookList != undefined) {
//         addressBookList.push(contactData);
//     } else {
//         addressBookList = [contactData];
//     }
//     // alert(addressBookList.toString());
//     localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
// };

const CreateAndUpdateLocalStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList) {
        let contactAddressBookData = addressBookList.find(contactData => contactData._id == contactAddressBookObject._id);
        if (!contactAddressBookData) {
            addressBookList.push(createAddressBookObject());
        } else {
            const index = addressBookList.map(contactData => contactData._id).indexOf(contactAddressBookData._id);
            addressBookList.splice(index, 1, createAddressBookObject(contactAddressBookData._id));
        }
    } else {
        addressBookList = [createAddressBookObject()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
    alert("Local Storage Updated Successfully!\nTotal Employees : " + addressBookList.length);
    // window.location.replace(site_properties.home_page);
}

const createContactId = () => {
    let contactId = localStorage.getItem("ContactID");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactID", contactId);
    return contactId;
};

const resetForm = () => {
    setValue("#name", "");
    setValue("#phone", "");
    setValue("#address", "");
    setValue("#city", "City");
    setValue("#state", "State");
    setValue("#zip", "");
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (propertyId, value) => {
    const element = document.querySelector(propertyId);
    element.value = value;
}

const getValue = (propertyId) => {
    let value = document.querySelector(propertyId).value;
    return value;
};

const setSelectedValues = (propertyName, values) => {
    let allValues = document.querySelectorAll(propertyName);
    allValues.forEach(input => {
        if (Array.isArray(values)) {
            if (values.includes(input.value)) {
                input.checked = true;
            }
        } else if (input.value == values) {
            input.checked = true;
        }
    });
};

const setForm = () => {
    setValue("#name", contactAddressBookObject._name);
    setValue("#phone", contactAddressBookObject._phone);
    setValue("#address", contactAddressBookObject._address);
    setValue("#state", contactAddressBookObject._state);
    setValue("#city", contactAddressBookObject._city);
    setValue("#zip", contactAddressBookObject._zip);
}

const checkForUpdate = () => {
    const contactToEditJson = localStorage.getItem("ContactToEdit");
    isUpdate = contactToEditJson ? true : false;
    if (!isUpdate) return;
    contactAddressBookObject = JSON.parse(contactToEditJson);
    setForm();
};