class HouseRobber {
    // [1,2,3,1] → 4
    // [2,7,9,3,1] → 12
    execute(money) {
        if (money.length === 0) return 0;
        if (money.length === 1) return money[0];

        // let prev2 = money[0];//1
        // let prev1 = Math.max(money[0], money[1]);//2

        // for (let i = 2; i < money.length; i++) {
        //     const curr = Math.max(prev1, prev2 + money[i]);
        //     prev2 = prev1;
        //     prev1 = curr;
        // }

        // return prev1;

        let prev = 0;
        let curr = 0;

        for(const m of money){//2,7,9,3,1
            let total = Math.max(curr,prev+m);//(0,0+2)(2,0+7)(7,2+9),(11,7+3),(11,11+1)

            prev = curr; //0,2,7,11,11
            curr = total; //2,7,11,11,12
        }
    }
}
console.log(new HouseRobber().execute([2,7,9,3,1]));
console.log(new HouseRobber().execute([10, 1, 1, 10]));
