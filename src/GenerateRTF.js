// export const generateRTF = (invoiceData, signatureName, withSignature) => {
//     const subtotal = invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
//     const discountAmount = (subtotal * invoiceData.discount) / 100;
//     const total = subtotal - discountAmount;
  
//     const rtfContent = `
//       {\\rtf1\\ansi\\deff0
//       {\\fonttbl{\\f0 Times New Roman;}}
//       {\\colortbl;\\red0\\green0\\blue0;}
//       \\f0\\fs24\\b Invoice\\b0\\line
//       Date: ${invoiceData.date}\\line
//       Company: ${invoiceData.company}\\line
//       Address: ${invoiceData.address}\\line
//       \\line
//       \\b Description\\b0\\tab\\b Quantity\\b0\\tab\\b Price\\b0\\tab\\b Total\\b0\\line
//       ${invoiceData.items
//         .map(
//           (item) =>
//             `${item.description}\\tab ${item.quantity}\\tab ${item.price}\\tab ${
//               item.quantity * item.price
//             }\\line`
//         )
//         .join("")}
//       \\line
//       Subtotal: ${subtotal}\\line
//       Discount: ${invoiceData.discount}%\\line
//       Total: ${total}\\line
//       ${withSignature && signatureName ? `Signed by: ${signatureName}\\line` : ""}
//       }
//     `;
//     return new Blob([rtfContent], { type: "application/rtf" });
//   };
export const generateRTF = (invoiceData, signatureName, withSignature, invoiceId) => {
  const subtotal = invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = (subtotal * invoiceData.discount) / 100;
  const total = subtotal - discountAmount;

  const rtfContent = `
    {\\rtf1\\ansi\\deff0
    {\\fonttbl{\\f0 Times New Roman;}}
    {\\colortbl;\\red0\\green0\\blue0;}
    \\f0\\fs24\\b Invoice\\b0\\line
    Date: ${invoiceData.date}\\line
    Invoice ID: ${invoiceId}\\line\\line
    Company: ${invoiceData.company}\\line
    Address: ${invoiceData.address}\\line
    Billing Address: ${invoiceData.billing_address}\\line\\line
    
    \\b Description\\b0\\tab\\b Quantity\\b0\\tab\\b Price\\b0\\tab\\b Total\\b0\\line
    ${invoiceData.items
      .map(
        (item) =>
          `${item.description}\\tab ${item.quantity}\\tab ${item.price}\\tab ${
            item.quantity * item.price
          }\\line`
      )
      .join("")}
    \\line
    Subtotal: ${subtotal}\\line
    Discount: ${invoiceData.discount}%\\line
    Total: ${total}\\line
    ${withSignature && signatureName ? `Signed by: ${signatureName}\\line` : ""}
    }
  `;
  return new Blob([rtfContent], { type: "application/rtf" });
};
