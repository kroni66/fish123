// Voucher Barcode Regex Pattern
// Requirements:
// - Total length: 15 characters
// - All characters are numbers/digits
// - Price starts at position 1
// - Price length: 4 characters
// - Amount decimal: 0 (integer price)

const VOUCHER_BARCODE_REGEX = /^\d{15}$/;

// Test function
function validateVoucherBarcode(barcode) {
  if (!VOUCHER_BARCODE_REGEX.test(barcode)) {
    return false;
  }

  // Extract price (first 4 digits)
  const priceStr = barcode.substring(0, 4);
  const price = parseInt(priceStr, 10);

  // Validate price is reasonable (not 0 and not too high)
  if (price < 1 || price > 9999) {
    return false;
  }

  return true;
}

// Test examples
console.log('=== Voucher Barcode Validation Tests ===\n');

// Valid examples (15 characters: all digits)
const validBarcodes = [
  '012345678901234', // Price: 123, remaining: 45678901234
  '000112345678901', // Price: 1, remaining: 12345678901
  '999987654321098', // Price: 9999, remaining: 87654321098
  '050012345678901', // Price: 500, remaining: 12345678901
];

console.log('✅ Valid Barcodes:');
validBarcodes.forEach(barcode => {
  const isValid = validateVoucherBarcode(barcode);
  const price = parseInt(barcode.substring(0, 4), 10);
  console.log(`  "${barcode}" → ${isValid ? 'VALID' : 'INVALID'} (Price: ${price})`);
});

// Invalid examples
const invalidBarcodes = [
  '123456', // Too short (6 chars)
  '123456789012345678901234567890', // Too long (30 chars)
  'ABCDEFGHIJKLNMO', // Contains letters (15 chars)
  '01234567890123', // Too short (14 chars)
  '0123456789012345', // Too long (16 chars)
  '000012345678901', // Price is 0 (invalid)
];

console.log('\n❌ Invalid Barcodes:');
invalidBarcodes.forEach(barcode => {
  const isValid = validateVoucherBarcode(barcode);
  console.log(`  "${barcode}" → ${isValid ? 'VALID' : 'INVALID'}`);
});

// Usage examples
console.log('\n=== Usage Examples ===');
console.log('JavaScript:');
console.log('const isValid = /^\\d{15}$/.test(barcode);');
console.log('');
console.log('TypeScript:');
console.log('const VOUCHER_REGEX = /^\\d{15}$/;\nif (VOUCHER_REGEX.test(barcode)) { ... }');
console.log('');
console.log('Python:');
console.log('import re\nVOUCHER_REGEX = r"^\\d{15}$"\nif re.match(VOUCHER_REGEX, barcode): ...');
console.log('');
console.log('PHP:');
console.log('$regex = "/^\\d{15}$/";\nif (preg_match($regex, $barcode)) { ... }');

// Extract price function
console.log('\n=== Extract Price Function ===');
console.log('function getVoucherPrice(barcode) {');
console.log('  // Price is in positions 1-4 (0-indexed: 0-3)');
console.log('  return parseInt(barcode.substring(0, 4), 10);');
console.log('}');

// Export for CommonJS compatibility
export { VOUCHER_BARCODE_REGEX, validateVoucherBarcode };
