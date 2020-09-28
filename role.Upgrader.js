/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader1 = {
    
    run: function(creep){
        if(creep.carry.energy == 0){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){creep.moveTo(sources[0]);}
        }
        else{
            if(creep.upgradeController(creep.room.controller)){creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#0000ff'}});}
        }
        
    }

};



var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
	    }
	    if(creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrade');
	    }
        
        // 只进行对Controller的升级，不进行其它的任务

	    if(creep.memory.upgrading == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else { 
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { 
                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#0000ff'}});
            }
        }
	}
};

module.exports = roleUpgrader;