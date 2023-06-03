// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

function getBlandsdic(cameras){
    let cameralistsBland = {
        "Cakon":[],
        "Go MN":[],
        "VANY":[]
    }

    cameras.forEach(function (eachCamera){
        cameralistsBland[eachCamera["brand"]].push(eachCamera)
    })

    return cameralistsBland
}

const dicCamerasBrand = getBlandsdic(camera);
const blandSelect = document.getElementById("select_bland");

let modelSelected = document.getElementById("select_model")

blandSelect.addEventListener("change", function() {
    const blandSelect = document.getElementById("select_bland");

let modelSelected = document.getElementById("select_model")

    let htmlString = '<select class="select" id="select_model">'
    dicCamerasBrand[`${blandSelect.value}`].forEach(function(blandCamera){
        let model = blandCamera["model"]
        htmlString += `<option value="${model}">${model}</option>`
    })
    htmlString += "</select>"
    modelSelected.innerHTML = htmlString
});


let consumptionSelected = document.getElementById("consumption")
    
class watt{
    constructor(battery){
    this.batteryName = battery["batteryName"]
    this.capacityAh = battery["capacityAh"]
    this.voltage =  battery["voltage"]
    this.maxDraw = battery["maxDraw"]
    this.endVoltage = battery["endVoltage"]    
    }

    getwatt(){
        return this.capacityAh* this.voltage
    }

    getSafteywatt(){
        return this.maxDraw * this.endVoltage
    }

    isUnderSaferyWatt(consumption, accessory){
        return (this.getSafteywatt()> consumption+accessory) 
    }

    makeHTMLStringBat(consumption, accessory){
        return `<div>
        <div class="cameraName">${this.batteryName}</div>
        <div class="timeButteryLimit">Estimate ${(this.getwatt()/(consumption+accessory)).toFixed(1)} hours</div>
        </div>`
    }
}

function makeAvailBatlist(consumption, accessory){
    htmlString = ""
    let batteryField = document.getElementById("butteryfield")
    battery.forEach(function(bat){ 
        const battClass = new watt(bat)
        console.log(battClass.getwatt(), battClass.getSafteywatt(),consumption, battClass.getwatt()/(consumption+accessory))
        if(battClass.isUnderSaferyWatt(consumption, accessory)){
            htmlString += battClass.makeHTMLStringBat(consumption, accessory)
        }
    })
    batteryField.innerHTML = htmlString
    
}

function setAvailavleButteries(){

    let accesoryPower = document.getElementById("num_consumption").value

    const modelNameSelected = document.getElementById("select_model").value
    let cameraConsumption
    
    camera.forEach(function(camera1) {
        if (camera1["model"]==modelNameSelected){
            cameraConsumption =  camera1["powerConsumptionWh"]

        }})
    
    makeAvailBatlist(parseFloat(cameraConsumption), parseFloat(accesoryPower))
}

const fieldslist = [blandSelect,modelSelected, consumptionSelected]

fieldslist.forEach((element)=>element.addEventListener("change", setAvailavleButteries))



    let htmlString = '<select class="select" id="select_model">'
    dicCamerasBrand[`${blandSelect.value}`].forEach(function(blandCamera){
        let model = blandCamera["model"]
        htmlString += `<option value="${model}">${model}</option>`
    })
    htmlString += "</select>"
    modelSelected.innerHTML = htmlString
setAvailavleButteries()
