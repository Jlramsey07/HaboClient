export const api_host = 'https://haboserver.herokuapp.com';
/**
 * Use DEV host when working locally, use environment host when in PROD
 */
export function send_request(route, method, data, content_type) {
  const obj = {
    method: method || "GET",
    credentials: 'include',
    headers: {
      "Accept": "application/json"
    }
  }
  if(data) {
    if(data.constructor === Object) {
      obj.body = JSON.stringify(data);
      obj.headers["Content-Type"] = content_type || "application/json";
    }
    if(data.constructor === FormData) {
      obj.body = data;
    }
  }
  const api = api_host + route;
  return fetch(api, obj).then((resp) => resp.json());
}


/**
 * GET requests
 */

export function check_session(data) {
  return send_request('/check_session', 'GET', null, null);
}

export function sign_out(data) {
  return send_request('/sign_out', 'GET', null, null);
}

export function get_user_by_id(id) {
  return send_request(`/users/${id}`, 'GET', null, null);
}

export function get_reviews_by_user_id(user_id, review_id) {
  return review_id
    ? send_request(`/users/${user_id}/reviews/${review_id}`, 'GET', null, null)
    : send_request(`/users/${user_id}/reviews`, 'GET', null, null);
}

export function get_user_details_by_user_id(id) {
  return send_request(`/users/${id}/page-details`, 'GET', null, null);
}

export function get_user_loan_requests_by_user_id(user_id, loan_request_id) {
  return loan_request_id
    ? send_request(`/users/${user_id}/loan-requests/${loan_request_id}`, 'GET', null, null)
    : send_request(`/users/${user_id}/loan-requests`, 'GET', null, null);
}

export function get_user_loans_requested_by_user_id(user_id, loan_request_id) {
  return loan_request_id
    ? send_request(`/users/${user_id}/loans-requested/${loan_request_id}`, 'GET', null, null)
    : send_request(`/users/${user_id}/loans-requested`, 'GET', null, null);
}

export function get_user_loans_given_by_user_id(user_id, loan_id) {
  return loan_id
    ? send_request(`/users/${user_id}/loans-given/${loan_id}`, 'GET', null, null)
    : send_request(`/users/${user_id}/loans-given`, 'GET', null, null);
}

export function get_user_loans_taken_by_user_id(user_id, loan_id) {
  return loan_id
    ? send_request(`/users/${user_id}/loans-taken/${loan_id}`, 'GET', null, null)
    : send_request(`/users/${user_id}/loans-taken`, 'GET', null, null);
}

export function search_users(minimum_available_amount, user_id) {
  return user_id
    ? send_request(`/search-users/${minimum_available_amount}/${user_id}`, 'GET', null, null)
    : send_request(`/search-users/${minimum_available_amount}`, 'GET', null, null);
}



/**
 * POST requests
 */

export function sign_up(data) {
  return send_request('/sign_up', 'POST', data, null);
}

export function create_review(data, user_id) {
  return send_request(`/users/${user_id}/create-review`, 'POST', data, null);
}

export function create_loan_request(data, user_id) {
  return send_request(`/users/${user_id}/request-loan`, 'POST', data, null);
}


/**
 * PUT requests
 */

export function sign_in(data) {
  return send_request('/sign_in', 'PUT', data, null);
}

export function update_user_setting(data) {
  return send_request('/update_user_setting', 'PUT', data, null);
}

export function update_loan_request(loan_request) {
  return send_request(`/loan-requests/${loan_request.id}`, 'PUT', loan_request, null);
}

export function update_loan_payoff(loan) {
  return send_request(`/loans/${loan.id}`, 'PUT', loan, null);
}



/**
 * DELETE requests
 */

export function cancel_loan_request (loan_request_id) {
  return send_request(`/loan-requests/${loan_request_id}/cancel`, 'DELETE', null, null);
}