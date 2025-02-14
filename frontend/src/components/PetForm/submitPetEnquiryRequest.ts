async function submitPetEnquiryRequest(petEnquiryPayload: object) {
  const petEnquiryUrl = "http://localhost:4000/petEnquiry";

  const response = await fetch(petEnquiryUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(petEnquiryPayload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export default submitPetEnquiryRequest;
