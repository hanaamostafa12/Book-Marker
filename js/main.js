

var inputSiteName = document.getElementById("suitName");
var inputSiteUrl = document.getElementById("suitUrl");

siteList = [];

if(localStorage.getItem('sites')){
    var siteList= JSON.parse(localStorage.getItem('sites'))
    displaySite()
   }
  
  

function main(){
    addSite()
    displaySite()
    clear ()
}

function addSite()
{

        var site =  {
            sitename:inputSiteName.value,
            siteurl:inputSiteUrl.value,
    
        }

        if(!validationAlert()){
            return
        }
      
        siteList.push(site);
        localStorage.setItem('sites',JSON.stringify(siteList))
}


function displaySite(){
    var cartona = ``;
    for(var i = 0 ; i < siteList.length; i++)
    {
        cartona += `
        <tr>
        <td>
          ${i}
        </td>
        <td>
        ${siteList[i].sitename}
        </td>
      

        <td>
        <a href="${siteList[i].siteurl}" target="_blank">${siteList[i].siteurl}</a>
        </td>
           
           <td>
            <button onclick="deleteSite(${i})"  class="btn btn-danger">delete</button>
           </td>
        
       </tr>
        `
    }

    document.getElementById('body').innerHTML = cartona ;

}



function clear (){
    inputSiteName.value = '';
    inputSiteUrl.value = '';
}


function deleteSite(index){
    siteList.splice(index,1)
    localStorage.setItem('sites',JSON.stringify(siteList));
    displaySite()
  }
  

function validationAlert(){
    var name = inputSiteName.value;
    var url = inputSiteUrl.value;
    var validationErrors = [];
    var namepattern = /^[A-z][a-z]{3,8}$/
    if (name!=namepattern) {
        if (!namepattern.test(name)) {
            validationErrors.push('Site name must contain at least 3 characters');
        }
    }
    var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if(url!=urlPattern){
    
        if (!urlPattern.test(url)) {
            validationErrors.push('Site URL is not valid.');
        }
    }
    if (validationErrors.length > 0) {
        alert(validationErrors.join('\n'));
        return false; 
}
return true;
}