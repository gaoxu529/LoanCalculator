function calculateLoan() {
    const loanType = document.getElementById('loanType').value;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    let monthlyPayment = 0;
    let totalInterest = 0;

    if (loanType === 'single') {
        totalInterest = loanAmount * interestRate * loanTerm / 12;
        monthlyPayment = (loanAmount + totalInterest) / loanTerm;
    } else if (loanType === 'emi') {
        const monthlyRate = interestRate / 12;
        monthlyPayment = (loanAmount * monthlyRate * Math.pow((1 + monthlyRate), loanTerm)) / (Math.pow((1 + monthlyRate), loanTerm) - 1);
        totalInterest = monthlyPayment * loanTerm - loanAmount;
    } else if (loanType === 'equalPrincipal') {
        const monthlyPrincipal = loanAmount / loanTerm;
        totalInterest = 0;
        for (let i = 0; i < loanTerm; i++) {
            totalInterest += (loanAmount - i * monthlyPrincipal) * (interestRate / 12);
        }
        monthlyPayment = loanAmount / loanTerm + (loanAmount * interestRate / 12);
    }

    document.getElementById('monthlyPayment').value = monthlyPayment.toFixed(2);
    document.getElementById('totalInterest').value = totalInterest.toFixed(2);
}
