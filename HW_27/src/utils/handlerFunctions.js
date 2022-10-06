export const createShortLink = async (urlLong) => {
  try {
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${urlLong}`
    );
    const jsonResponse = await response.json();
    return jsonResponse.result.full_short_link;
  } catch (e) {
    console.log(e);
    return "";
  }
};

export const copyToClipboard = (str) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject("The Clipboard API is not available.");
};

export const handleClickShareButton = async (elems, setShortedUrl) => {
  const domain = window.location.origin.replace("localhost", "127.0.0.1");
  const params = new URLSearchParams();
  elems.forEach((elem) => {
    params.append(elem.type, elem.value);
  });
  const fullUrl = params.toString()
    ? `${domain}?${encodeURIComponent(params.toString())}`
    : domain;
  try {
    const shoterdUrl = await createShortLink(fullUrl);
    await copyToClipboard(shoterdUrl);
    setShortedUrl(shoterdUrl);
  } catch (error) {
    console.error(error);
  }
};