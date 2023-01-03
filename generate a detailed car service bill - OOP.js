// Question 2:
// Please implement a software for a car service station using Object Oriented Programming. If you are not familiar or
// comfortable with object-oriented programming, we suggest you give some articles a quick read to ensure you
// understand it before you attempt it.
// It should have the following features:
// The car service station caters to different types of cars – Hatchback, Sedan, SUV.
// It provides different types of services like Basic Service, Engine Fixing, Clutch Fixing, Gear Fixing and Brake Fixing.
// Each service has a service code associated with it and different prices for different types of cars.
// Service Code Service Hatchback Sedan SUV
// BS01 Basic Servicing ₹ 2000 ₹ 4000 ₹ 5000
// EF01 Engine Fixing ₹ 5000 ₹ 8000 ₹ 10000
// CF01 Clutch Fixing ₹ 2000 ₹ 4000 ₹ 6000
// BF01 Brake Fixing ₹ 1000 ₹ 1500 ₹ 2500
// GF01 Gear Fixing ₹ 3000 ₹ 6000 ₹ 8000
// The software should generate a detailed bill with the total amount for each service request based on the Type of
// Car specified and the requested Service Codes

/* The Car class has a constructor that takes a brand as a parameter and assigns it to the brand
property. It also has a getBrand method that returns the brand property. */
class Car {
  constructor(brand) {
    this.brand = brand;
  }

  getBrand() {
    return this.brand;
  }
}

/* The Service class is a class that represents a service that can be performed on a car. It has a
code, a name, and a price for each brand of car. */
class Service {
  constructor(code, name, brandPrices = [[]]) {
    this.code = code;
    this.codename = name;
    brandPrices.forEach(([name, price]) => (this[name] = price));
  }

  getCode() {
    return this.code;
  }

  getPrice(car) {
    return this[car.getBrand().toLowerCase()];
  }
}

/* The RequestAmount class is a class that takes a car and a service and returns the total amount of
the service. */
class RequestAmount {
  constructor(car, service) {
    this.car = car;
    this.service = service;
  }

  getTotalAmount() {
    return this.service.getPrice(this.car);
  }
}

// Create a list of services
const services = [
  new Service("BS01", "Basic Servicing", [
    ["hatchback", 2000],
    ["sedan", 4000],
    ["suv", 5000]
  ]),
  new Service("EF01", "Engine Fixing", [
    ["hatchback", 5000],
    ["sedan", 8000],
    ["suv", 10000]
  ]),
  new Service("CF01", "Clutch Fixing", [
    ["hatchback", 2000],
    ["sedan", 4000],
    ["suv", 6000]
  ]),
  new Service("BF01", "Break Fixing", [
    ["hatchback", 1000],
    ["sedan", 1500],
    ["suv", 2500]
  ]),
  new Service("GF01", "Gear Fixing", [
    ["hatchback", 3000],
    ["sedan", 6000],
    ["suv", 8000]
  ])
];

// Create a map mapping service codes to services
const serviceLookup = new Map();
for (const service of services) {
  serviceLookup.set(service.getCode(), service);
}

function getService(code) {
  return serviceLookup.get(code);
}

/**
 * It takes a brand and an array of service codes, and returns an object containing the brand, the
 * service codes, the services, and the total
 * @param [brand] - The brand of the car.
 * @param [servicesTaken] - An array of service codes.
 * @returns An object with the following properties:
 * - brand: The brand of the car
 * - serviceCodes: A string of the service codes taken
 * - services: An array of arrays, each containing the service code and the amount
 * - total: The total amount of the bill
 */
const getBill = (brand = "", servicesTaken = [""]) => {
  const car = new Car(brand);
  const bill = {
    brand: car.getBrand(),
    serviceCodes: servicesTaken.toString().replace(/,/gi, ", "),
    services: [],
    total: 0
  };

  servicesTaken.forEach(code => {
    const currentRequest = new RequestAmount(car, getService(code));
    const amount = currentRequest.getTotalAmount();
    bill.services.push([getService(code)?.codename, amount]);
  });

  bill.total = bill.services.reduce((prev, cur) => prev + cur[1], 0);

  if (bill.total > 10000) bill.services.push(["Cleaning (complimentary)", 0]);
  return bill;
};

/**
 * It takes an object with the following properties: brand, serviceCodes, services, total and returns a
 * string with the following format:
 *
 * Type of Car -
 *
 * Service Codes -
 *
 * Service Names
 *
 * Total Bill - ₹
 * @returns A function that takes an object as an argument and returns a string.
 */
const billStatement = ({
  brand = "",
  serviceCodes = "",
  services = [],
  total = 0
}) => {
  const serviceNames = services
    .map(service => service.toString().replace(/,/gi, " - ₹ "))
    .toString()
    .replace(/,/gi, "\n");
  return `Type of Car - ${brand} \nService Codes - ${serviceCodes} \n\n${serviceNames} \n\nTotal Bill - ₹ ${total}`;
};

const servicesTaken = ["BS01", "EF01", "CF01"];

console.log(billStatement(getBill("Hatchback", servicesTaken)));
console.log(billStatement(getBill("Sedan", servicesTaken)));
console.log(billStatement(getBill("SUV", servicesTaken)));
