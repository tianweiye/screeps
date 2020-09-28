var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.builder');


module.exports.loop = function () {
    
    // 将多于的名字清空内存
    for(var name in Memory.creeps) { 
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    
    // 分工干活
    for (i in Game.creeps){
        
        var creep = Game.creeps[i];
        switch(creep.memory.role){
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'Upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
        }
    }
    
}