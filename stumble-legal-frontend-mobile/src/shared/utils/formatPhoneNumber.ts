import { parsePhoneNumber } from 'libphonenumber-js';

export function formatPhoneNumber(phoneNumber: string): string {
  try {
    const parsed = parsePhoneNumber(phoneNumber, 'AU');
    return parsed.country === 'AU'
      ? parsed
          .formatNational()
          .replace(/[()]/g, '')
          .replace(/\s+/g, '')
          .replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3')
      : parsed.number;
  } catch (e) {
    return phoneNumber;
  }
}
