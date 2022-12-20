const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
   'employee',
   'root',
   '',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
const Employee = sequelize.define("emps", {
    name: {
      type: Sequelize.STRING,
    },
    job: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.INTEGER,
    }
 });
 sequelize.sync()
function findall(){
    return new Promise((resolve,reject)=>{
        sequelize.sync().then(()=>{
            Employee.findAll().then(res=>{
                resolve(res)
            })
        })
    })
} 

function findbyid(id){
    return new Promise((resolve,reject)=>{
        sequelize.sync().then(()=>{
            Employee.findOne({
                where:{id:id}
            }).then(res=>{
                resolve(res)
            })
        })
    })    
}
function create(emp){
    return new Promise((resolve,reject)=>{
        sequelize.sync().then(()=>{
            Employee.create(emp).then(res=>{
                resolve()
            })
        })
    })
}
function update(id,emp){
    return new Promise((resolve,reject)=>{
        sequelize.sync().then(()=>{
            Employee.update(emp,{where: {id:id}}).then(res=>{
                resolve()
            })
        })
    })
}
 
function remove(id){    
    return new Promise((resolve,reject)=>{
        sequelize.sync().then(()=>{
            Employee.destroy({where:{id:id}}).then(res=>{
                resolve(res)
            })
        })
    })
}
module.exports={
      findall,findbyid,create,update,remove
}