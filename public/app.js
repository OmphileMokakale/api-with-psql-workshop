let seasonFilter = 'All';
let genderFilter = 'All';

const seasonOptions = document.querySelector('.seasons');
const genderOptions = document.querySelector('.genders');
const searchResultsElem = document.querySelector('.searchResults');
const priceRangeElem = document.querySelector('.priceRange');
const showPriceRangeElem = document.querySelector('.showPriceRange');

const garmentsTemplateText = document.querySelector('.garmentListTemplate');
const garmentsTemplate = Handlebars.compile(garmentsTemplateText.innerHTML);


seasonOptions.addEventListener('click', function(evt){
	seasonFilter = evt.target.value;
	filterData();
});

genderOptions.addEventListener('click', function(evt){
	genderFilter = evt.target.value;
	filterData();
	
});

const token = localStorage.getItem('token')

const config = {
    connectionString: process.env.DATABASE_URL || 'postgres://gary:gar123@localhost:5432/garment_app',
    max: 30,
    ssl:{ rejectUnauthorized : false}
 };
 
 const db = pgp(config);
 
function filterData() {

    fetch(`/api/garments/gender/${genderFilter}/season/${seasonFilter}`, this.config)
	.then(r => r.json())
	.then(userData => garments = userData )
    
	
}



priceRangeElem.addEventListener('change', function(evt){
	const maxPrice = evt.target.value;
	showPriceRangeElem.innerHTML = maxPrice;
	axios
		.get(`/api/garments/price/${maxPrice}`)
		.then(function(result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments : result.data.garments
			})
		});
});


// fields to be read from the DOM
const domFields = {token : 'anything there'};
  window.onload = () => {

	axios.post('/', {username: 'OmphileMokakale'})
	.then((result) => {
		// show snackbar - with success message
		console.log(result.data);
		localStorage.setItem('token', token)
	})

	// axios.post('/api/garments', domFields)
	// .then((result) => {
	// 	// show snackbar - with success message
	// 	// console.log(result.data);
	// })
	// .catch(err => {
	//   console.log(err);
	// });
	
  }
 
  


	// function myFunction() {
	// 	// Get the snackbar DIV
	// 	var x = document.getElementById("snackbar");
	  
	// 	// Add the "show" class to DIV
	// 	x.className = "show";
	  
	// 	// After 3 seconds, remove the show class from DIV
	// 	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	//   }