let photoElement = document.querySelector("#photo")

photoElement.addEventListener('change',  async(event)=>{
  if(event.target.files.length){
    let formData = new FormData()
    formData.append('photo', event.target.files[0])
    let response = await fetch('photo', {
      method: "POST",
      body: formData
    })
    response = await response.json()
    console.log(response);
    if(response.ok){
      window.location.reload()
    }else{
      alert('Error')
    }
  }
} )