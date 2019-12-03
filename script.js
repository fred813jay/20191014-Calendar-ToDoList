var vm = new Vue({
  el: "#app",
  data: {
    tags: "日一二三四五六",
    days: [],
    selected_day: 0,
    start_day: 2,
    lunar_pan: 2,
    new_item: {
      title: "標題",
      time: "23:00",
    }
  },
  mounted() {
    for(var i=1; i<=31 ; i++){
      var new_day={
        number: i,
        events: []
      };
      if (Math.random()<0.4){
        var count=Math.random()*3;
        for(let o=0; o<count; o++){
          var minute= parseInt(Math.random()*4)*15;
          var hour= parseInt(Math.random()*24)
          var hourString = hour.toString();
          new_day.events.push(
            {
              title: ["整理房間","打包行李","出門參加活動"][parseInt(Math.random()*3)],
              time: (hourString.length==1?"0":"")+hour+":"+(minute==0?"0":"")+minute,
            }
          );
        }
      }
      this.days.push(new_day);
    };
  },  
  computed: {
    now_events(){
      if (this.days[this.selected_day].events!=0){
        return this.sort_time(this.days[this.selected_day].events);
      }  
    }
  },
  methods: {
    get_pan(id){
      if (id!=0)
        return null;
      else
        return { 'margin-left' : 'calc( '+this.start_day+' * 100% / 7)' };
    },
    chinese_num(num){
      var list="十一二三四五六七八九";
      return list[num];
    },
    lunar(num){
      if (num>30) num=num%30+1;
      if (num <= 10){
        return "初"+this.chinese_num(num%10);
      }
      else if (num == 20){
        return "二十";
      }  
      else if (num == 30){
        return "初"+this.chinese_num(num%10+1)
      }
      else if(num < 20){
        return "十"+this.chinese_num(num%10);;
      }
      else if(num < 30){
        return "廿"+this.chinese_num(num%10);;
      }
    },
    add_item(){
      this.days[this.selected_day].events.push(
        //避免與V-model連動，故使用JSON複製出新個體
        JSON.parse(JSON.stringify(this.new_item))
      );
    },
    sort_time(events){
      return events.sort(
        (a,b) => {
          return parseInt(a.time.replace(":",""))-parseInt(b.time.replace(":",""))
        }
      );
    },
  },
})