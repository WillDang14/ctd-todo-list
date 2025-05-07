// This function does not count on case "DELETE"

// Only GET, POST, PATCH

/* ============================================= */
function FetchOptions(method, token, payload) {
  if (method.toUpperCase() === 'GET') {
    return {
      method: method,
      headers: { Authorization: token },
    };
  }

  return {
    method: method.toUpperCase(),
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
}

/* ============================================= */
export default FetchOptions;
