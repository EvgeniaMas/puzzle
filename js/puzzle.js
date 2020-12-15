   
      const dragstart = function(event) {
        event.dataTransfer.setData('text', event.target.id);
      };
      const dragover = function(event) {
        if(event.target.nodeName.toLowerCase() === 'img') {
          return true;
        }
        event.preventDefault();
      }
      const drop = function(event) {
        event.preventDefault();
        let imageId = event.dataTransfer.getData('text');
        event.target.appendChild(document.getElementById(imageId));
      };

      const cells = document.getElementsByClassName('col');
      Array.from(cells).forEach((element) => {
        element.addEventListener('dragover',dragover);
        element.addEventListener('drop',drop);
      });      

      const images = document.getElementsByTagName('img');
      Array.from(images).forEach((element) => {
        element.addEventListener('dragstart',dragstart);
      });




mnemo_fills = document.querySelectorAll('.chunk_puzzle');


 mnemo_fills.forEach(mnemo_fill => {
        mnemo_fill.addEventListener('touchstart', touchStart);
        mnemo_fill.addEventListener('touchmove',touchMove);
        mnemo_fill.addEventListener('touchend', touchEnd);
      });




// прикосновения
let mnemo_startx;
let mnemo_starty;
let mnemo_coord_x;
let mnemo_coord_y;
 
let blocks_coordinates = [];


mnemo_empties = document.querySelectorAll('.col');


function touchStart(e){
let touchobj = e.changedTouches[0] // первая точка прикосновения
// e.target.classList.add('moved');
mnemo_startx = parseInt(touchobj.clientX);
mnemo_starty = parseInt(touchobj.clientY);
current_fill = e.target;
let coordinates = current_fill.getBoundingClientRect();
mnemo_coord_x = coordinates.top;
mnemo_coord_y = coordinates.left;
    for (let i=0; i<mnemo_empties.length; i++){
        let c = mnemo_empties[i].getBoundingClientRect();
        let block_coordinate_x = c.left;
        let block_coordinate_y = c.top;
        let coor_to_check = [block_coordinate_x, block_coordinate_y ];
       blocks_coordinates.push(coor_to_check);
       coor_to_check = [];
    }
  e.preventDefault();
}
  
function touchMove(e){
  let touchobj = e.changedTouches[0];
  let dist_horizontal = parseInt(touchobj.clientX) - mnemo_startx;
  let dist_vertical = parseInt(touchobj.clientY) - mnemo_starty;
  current_fill.classList.add('dragged_image');
  current_fill.style.left =   dist_horizontal + 'px';
  current_fill.style.top = dist_vertical +  'px';
  e.preventDefault();

}

function touchEnd(e){
let coordinates = current_fill.getBoundingClientRect();
mnemo_coord_x = coordinates.top;
mnemo_coord_y = coordinates.left;
    
    for (let i=0; i<blocks_coordinates.length; i++){ 

         let position_x = Math.abs(mnemo_coord_x - blocks_coordinates[i][1]);
         let position_y = Math.abs(mnemo_coord_y - blocks_coordinates[i][0]);

        if(position_x <50  && position_y <50){

          let content = mnemo_empties[i].innerHTML;

          
             if(content.trim() == ''){


                      mnemo_empties[i].className = 'mnemo_empty';
                     

                      current_fill.className = 'mnemo_fill';

                       current_fill.style.top = 0;
                       current_fill.style.left =0;

                       mnemo_empties[i].append(current_fill) ;


                        return false;

                 // current_fill.classList.add('mnemo_fill');
                
                  mnemo_empties[i].append(mnemo_empties);
              }
             // else{
            
             // }
            }           
       

       else{

        current_fill.style.top = 0;
        current_fill.style.left =0;

         // mnemo_fill_items.append(current_fill);
       }


       } //for-end



        let touchobj = e.changedTouches[0] 
        
        e.preventDefault();

}

