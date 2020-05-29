export default function() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://riskdatabase.herokuapp.com/'
  } else {
    return 'http://localhost:4500/'
  }
}
