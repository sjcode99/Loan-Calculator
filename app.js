document.getElementById('loan-form').addEventListener('submit', function(e){

    document.getElementById('loader').style.display = 'block';
    

    setTimeout(calculateResults, 2000);
    
    
    e.preventDefault();
});



function calculateResults(e) {

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calculatedinterest = parseFloat(interest.value) / 100 / 12;
    const calculatedpayments = parseFloat(years.value) * 12;


    const x = Math.pow(1 + calculatedinterest, calculatedpayments);
    const monthly = (principal * x * calculatedinterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedpayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedpayments) - principal).toFixed(2);
        
        document.getElementById('results').style.display = 'block';

        document.getElementById('loader').style.display = 'none';



    }
    else {
        showError('please check your numbers');

        document.getElementById('results').style.display = 'none';

        document.getElementById('loader').style.display = 'none';


    }
}

function showError(error) {
    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card-body');
    const heading = document.querySelector('.heading');


    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);
    
    setTimeout(clearError, 3000);


}
function clearError(){
    document.querySelector('.alert').remove();

}