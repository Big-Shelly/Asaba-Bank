export const generateReferenceCode = (): string => {
  const timestamp = new Date().getTime().toString();
  const random = Math.random().toString(36).substring(2, 8);
  const prefix = 'ASB'; // ASB for Asaba Bank
  
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
};
