/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) { // 没能量就挖矿
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) { // 有能量就开建
	        creep.memory.building = true; // 这不就是个flag么...真的丑
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) { // 建造
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
            	creep.say('🚧 build');
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0000ff'}});
                }
            }
	    }
	    else { // 挖矿
	    	creep.say('🔄 harvest');
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff0000'}});
            }
	    }
	}
};

module.exports = roleBuilder;

