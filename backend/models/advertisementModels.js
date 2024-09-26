module.exports=(sequelize,DataTypes)=>{
    const Adverts=sequelize.define("Adverts",{
       role:{
        type:DataTypes.STRING,
        allowNull:false
       } ,
       description:{
        type:DataTypes.STRING,
        allowNull:false
       } ,
       requirements:{
        type:DataTypes.STRING,
        allowNull:false
       } 
    })

    
    return Adverts;
}