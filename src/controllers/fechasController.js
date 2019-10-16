let dias=[
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
];

function cantDaysMonth(mes,anno)
{
    switch(mes)
    {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if(anno % 100 == 0 )
                if(anno % 400==0)
                    return 29;
                else
                    return 28; 
            else if(anno%4==0)
                return 29
            else
                return 28;
    }
}

function dayOfWeekP(dt){
    let fecha=new Date(dt);
    return fecha.getDay();
}
function countHourDayP(dt){
    let fecha=new Date(dt);
    let d=fecha.getDay();
    let cant;
    switch(d)
    {
        case 5:
            cant=8;
            break;
        case 6:
        case 0:
            cant=0;
            break;
        default:
            cant=9;
            break;
    }
    return cant;
}

module.exports =  {
    dayOfWeek:att=>{
        let d=dayOfWeekP(att);
        return {dia:d,name:dias[d]};
    },
    countHourDay:att=>{
        return countHourDayP(att);
    },
    countHourMonth:(mes,anno)=>{
        let cantMont=cantDaysMonth(mes,anno);
        if(!cantMont)
          return null;
        let cant=0;
        for(let i=1;i<=cantMont;i++)
        {
        let date=new Date(anno+'/'+mes+'/'+i);
        cant+=countHourDayP(date);
        console.log(countHourDayP(date));
        }
        return cant;
    },
    diasFeriados:async (mes,anno,app)=>{
        let dayI=new Date(anno+'/'+mes+1);
        let dayEnd=new Date(anno+'/'+mes+cantDaysMonth(mes,anno));
        let all=await app.db.models.Feriados.findAll();
        return all;
    }

}