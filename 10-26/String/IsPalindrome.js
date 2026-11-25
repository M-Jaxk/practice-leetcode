class IsPalandrome{
    execute(str=""){
        const nomalized = str.toLowerCase();
        for(let i=0;i<nomalized.length/2;i++){
            if(nomalized[i] !== nomalized[nomalized.length-1-i])
                return false;
        }
        return true;
    }
}

console.log(new IsPalandrome().execute("Amanaplanacanalpanama"));
console.log(new IsPalandrome().execute(" "));