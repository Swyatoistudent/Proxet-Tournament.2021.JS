const fs = require('fs')
export interface Teams {
  team1: string[];
  team2: string[];
}

export const generateTeams = (filePath: string): Teams => {
  // Please implement your algorithm there.
  let file = fs.readFileSync(''+filePath,'utf8')
  let rows = file.split('\r\n')//split by rows
  let sort_players=[]
  let buff//buffer for row splits


  let t1= [] 
  let t2= []
  //row split and pushing object 
  for(let i = 1;i<rows.length;i++){
    buff = rows[i].split('\t')
    sort_players[i-1]={'name':buff[0],'time':buff[1],'type':buff[2]}
  }
  // sort by ascending time
  sort_players.sort(( a, b ) => b.time - a.time)
  /* this loop selects 9 players into both teams */
  let type = 1
  let i=0
  while(type<=3&&i<sort_players.length){
    if(sort_players[i].type==type){
      if(t1.length==type*3){ //if team have 3 players of the same types, add 3 players into other team
        t2.push(sort_players[i].name)
      }
      else{
      t1.push(sort_players[i].name)
      }
      if(t2.length==type*3){
        type++;
        i=0
      }
    }
    i++
}
  return {
    team1: t1,
    team2: t2,
  };
};