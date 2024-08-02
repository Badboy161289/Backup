import {
  Packer,
  Document as DocxDocument,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";

export const generateWord = async (invoiceData, signatureName, withSignature) => {
  const subtotal = invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = (subtotal * invoiceData.discount) / 100;
  const total = subtotal - discountAmount;

  const doc = new DocxDocument({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ text: "Invoice", heading: "Heading1" }),
          new Paragraph({ text: `Date: ${invoiceData.date}` }),
          new Paragraph({ text: `Company: ${invoiceData.company}` }),
          new Paragraph({ text: `Address: ${invoiceData.address}` }),
          new Paragraph({ text: `Billing Address: ${invoiceData.billing_address}` }), // Added billing address

          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Description" })],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Quantity" })],
                    width: { size: 15, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Price" })],
                    width: { size: 15, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Total" })],
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              ...invoiceData.items.map(
                (item) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: item.description })],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: item.quantity.toString() })],
                        width: { size: 15, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: item.price.toString() })],
                        width: { size: 15, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: (item.quantity * item.price).toString() })],
                        width: { size: 20, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  })
              ),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "" })],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "" })],
                    width: { size: 15, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Subtotal" })],
                    width: { size: 15, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: subtotal.toString() })],
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "" })],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "" })],
                    width: { size: 15, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Discount" })],
                    width: { size: 15, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: `${invoiceData.discount}%` })],
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "" })],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "" })],
                    width: { size: 15, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Total" })],
                    width: { size: 15, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: total.toString() })],
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              withSignature && signatureName
                ? new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: "" })],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: "" })],
                        width: { size: 15, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: "Signed by" })],
                        width: { size: 15, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: signatureName })],
                        width: { size: 20, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  })
                : null,
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
};
