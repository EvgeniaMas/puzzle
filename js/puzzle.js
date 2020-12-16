 'use strict';
let puzzle_chunks = 12;
let puzzle_startx;
let puzzle_starty;
let puzzle_coord_x;
let puzzle_coord_y; 
let blocks_coordinates = [];
const notification = document.getElementById('notification');
let puzzle_empties = document.querySelectorAll('.col');
let puzzle_fills = document.querySelectorAll('.chunk_puzzle');
let current_fill;
let current_fill_id; 
// drag and drop events
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
        --puzzle_chunks;
        checkFinish();
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


// touch events
puzzle_fills.forEach(puzzle_fill => {
      puzzle_fill.addEventListener('touchstart', touchStart);
      puzzle_fill.addEventListener('touchmove',touchMove);
      puzzle_fill.addEventListener('touchend', touchEnd);
    });

function touchStart(e){
let touchobj = e.changedTouches[0] 
puzzle_startx = parseInt(touchobj.clientX);
puzzle_starty = parseInt(touchobj.clientY);
current_fill = e.target;
current_fill_id = current_fill.getAttribute('id');
console.log(current_fill_id);
let coordinates = current_fill.getBoundingClientRect();
puzzle_coord_x = coordinates.top;
puzzle_coord_y = coordinates.left;
    for (let i=0; i<puzzle_empties.length; i++){
        let c = puzzle_empties[i].getBoundingClientRect();
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
  let dist_horizontal = parseInt(touchobj.clientX) - puzzle_startx;
  let dist_vertical = parseInt(touchobj.clientY) - puzzle_starty;
  current_fill.classList.add('dragged_image');
  current_fill.style.left =   dist_horizontal + 'px';
  current_fill.style.top = dist_vertical +  'px';
  e.preventDefault();
}

function touchEnd(e){
let coordinates = current_fill.getBoundingClientRect();
puzzle_coord_x = coordinates.top;
puzzle_coord_y = coordinates.left;    
    for (let i=0; i<blocks_coordinates.length; i++){ 
         let position_x = Math.abs(puzzle_coord_x - blocks_coordinates[i][1]);
         let position_y = Math.abs(puzzle_coord_y - blocks_coordinates[i][0]);
               console.log(puzzle_empties[i].classList);
               console.log(current_fill_id);
                       current_fill.style.top = 0;
                       current_fill.style.left =0;
                 if(puzzle_empties[i].classList.contains(current_fill_id)){
                   puzzle_empties[i].append(current_fill);
                   --puzzle_chunks;
                   checkFinish();
                 }
                 else{
                    notification.innerText = '다시 시도해보세요!';
                    setTimeout('cleanNotification()', 2000);
                 }                               
              // }
           } //for-end
        let touchobj = e.changedTouches[0];        
        e.preventDefault();
}
// clean notification
function cleanNotification(){
  notification.innerText = '';
}

// game over if correct image
function checkFinish(){
  console.log(puzzle_chunks);
   if(puzzle_chunks == 0){
    notification.innerText = '완성하였습니다! 다음 단계로 넘어가세요';
  }
  else{
    notification.innerText = '';
  }
}