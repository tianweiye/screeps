/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var roleHarvester  = {
    run: function(creep) {
    	//干活到满为止
        if(creep.carry.energy < creep.carryCapacity){
        	//找到所有资源
            var sources = creep.room.find(FIND_SOURCES); 
            //距离0号资源过远
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
            	creep.moveTo(sources[0],{visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        else {
            switch(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY, 50)){
                //距仓库过远=>移动
                case ERR_NOT_IN_RANGE: 
                    creep.moveTo(Game.spawns['Spawn1'],{visualizePathStyle: {stroke: '#00ff00'}});
                    break;

                //能量库存满=>生产
                case ERR_FULL:
                    console.log('Spawn is full');
                    for(var i=1;i<20;i++){
                        if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE],'Worker'+i, {memory: {role: 'harvester'}}) == 0  )
                            {console.log('worker 成功创建 '+i);break;}
                        if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE],'builder'+i, {memory: {role: 'builder'}}) == 0  )
                            {console.log('builder 成功创建 '+i);break;} 
                        if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE],'Upgrader'+i, {memory: {role: 'Upgrader'}}) == 0  )
                            {console.log('upgrader 成功创建 '+i);break;} 
                    }
                    break;
                default:
                
            }
            }
        }
            
    }
module.exports = roleHarvester;