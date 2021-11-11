  //Add new array to localStorage on start
    function init() {
                
            let taskList = JSON.parse(window.localStorage.getItem('taskList'));
            if(taskList == null) {
                taskList = Array();
                window.localStorage.setItem('taskList',                                     JSON.stringify(taskList));
            }
            showItems();
        }     
    //RPN
        function calcRpn(s) {
            let st,tk,i,x,y,z
            s = s.replace(/^\s*|\s*$/g,'')
            s = s.length>0 ? s.split(/\s+/) : []
            st = []
            for (i=0; i<s.length; ++i) {
              tk = s[i]
              if (/^[+-]?(\.\d+|\d+(\.\d*)?)$/.test(tk))
                z = Number(tk)
              else {
                if (tk.length>1 || '+-*/'.indexOf(tk)==-1 || st.length<2) break
                y = st.pop();  x = st.pop()
                z = eval(x+tk+' '+y)
              }    
              st.push(z)
            }       
            
          /*Error bad input */
            return i<s.length || st.length>1 ? 'error'
                 : st.length==1 ? st.pop() : ''
          }
    
          //Add items
     function addTask(s) {
            
            let rpn = document.getElementById('RPNresult').value;

            let taskList = JSON.parse(window.localStorage.getItem('taskList'));
            taskList.push(rpn);
            window.localStorage.setItem('taskList', JSON.stringify(taskList));
            document.getElementById('RPNresult').value = "";
            showItems();
        }
        //Show new items
        function showItems() {
            let taskListDiv = document.getElementById('taskList');
            let taskArray = JSON.parse(window.localStorage.getItem('taskList'));
            let buffer = "";
            buffer += "<ul>";
            for(let i=0; i< taskArray.length; i++) {
                buffer += "<li>"+"Result: &nbsp "+ taskArray[i] +"&nbsp &nbsp &nbsp"+"<button onclick=\"removeItem("+ i +")\">Delete</button>"+"</li>"+"<br>";
            }
            buffer += "</ul>";
            taskListDiv.innerHTML = buffer;
        }
        //Delete one item
        function removeItem(i) {
            let taskArray = JSON.parse(window.localStorage.getItem('taskList'));
            taskArray.splice(i, 1);
            window.localStorage.setItem('taskList', JSON.stringify(taskArray));
            showItems();
        }
    
        //Delete all data 
        function myFunction() {
            window.localStorage.clear();
             window.location.reload(true);
  }
    //Duplicate last value
    function dup(){
        let taskArray = JSON.parse(window.localStorage.getItem('taskList'));
        let arr = taskArray[taskArray.length - 1]
        let duplicOut = document.getElementById("duplicOut");
        duplicOut.innerHTML = arr;

    }    
    
    