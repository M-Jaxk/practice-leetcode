class HospitalManagement{
    
    constructor(){
        this.normalPatients = []
        this.emergencyPatients = []
    }

    // addPatient(name){
    //     this.patients.push(name)
    // }

    // makeTreatment(){
    //     this.patients.shift();
    // }

    next(){
        if(this.emergencyPatients.length){
            this.emergencyPatients.shift();
        }else{
            this.normalPatients.shift();
        }
    }
    execute(){

        const patients = [
            {name:"A",status:"Normal"},
            {name:"B",status:"Emergency"},
            {name:"C",status:"Normal"},
            {name:"D",status:"Emergency"}
        ];
    
        for(const p of patients){
            if(p.status === "Emergency"){
                this.emergencyPatients.push(p.name);//[B,D]
            }else{
                this.normalPatients.push(p.name);//[A,C]
            }
        }

        console.log(this.emergencyPatients,this.normalPatients)
        this.next();
        this.next();
        console.log(this.emergencyPatients,this.normalPatients)

    }
}

new HospitalManagement().execute()