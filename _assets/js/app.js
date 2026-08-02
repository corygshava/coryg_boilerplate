
const fetch_bypass = "fetch_bypass_" + mekRandomString(5);
const fetch_bypass_fyls = "fetch_bypass_fyls_" + mekRandomString(5);
const simple_fetch = "simple_fetch_bypass_" + mekRandomString(5);
const session_CSRF_token = mekRandomString(12);
const fetch_identifier = "viaFetch";

curfun = fetch_bypass;
if(window[curfun] == undefined){
	window[curfun] = async (p,dta = {},mt = 'POST',skipappend = false,use_as_is=false) => {
		try{
			alert_silent({to: p,data: dta,method: mt});

			if(!skipappend && !use_as_is){
				dta[fetch_identifier] = 'yes';
				dta['source'] = 'makwldnnalwkndajkdnajwdn_testenviron';
			}
			// alert_dark(JSON.stringify(dta));

			let headers = {
				'X-Requested-With' : 'XMLHttpRequest',
				'X-CSRF-TOKEN' : session_CSRF_token,
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			};

			const prff = JSON.parse(localStorage.getItem(pref_auth));

			// alert(prff);

			if (prff !== null) {
				headers['Authorization'] = `Bearer ${prff.value}`
			}

			let body = mt == "GET" || mt == 'HEAD' ? null : (use_as_is ? dta : JSON.stringify(dta));

			// alert_info(JSON.stringify(headers));
			// console.log(`${fetch_bypass}: `,dta);

			let req = await fetch(p,{
				method: mt.toUpperCase(),
				headers: headers,
				// credentials: 'same-origin',
				body: body,
			});

			if(!req.ok){
				if(req.status == 422){
					throw new Error(`[${req.status}] -> some required fields are missing`);
				} else if(req.status == 419){
					throw new Error(`[${req.status}] -> Your session has expired, reload the page to continue`);
				}

				throw new Error(`[${req.status}] -> ${req.statusText}`);
			}

			return await req.json();
		} catch (error){
			alert_danger(error);
			throw new Error(error);
		}
	}
}

curfun = fetch_bypass_fyls;
if(window[curfun] == undefined){
	window[curfun] = async (p,dta = {},mt = 'POST',skipappend = false,use_as_is=false) => {
		try{
			alert_silent({to: p,data: dta,method: mt});

			if(!skipappend && !use_as_is){
				dta[fetch_identifier] = 'yes';
			}
			// alert_dark(JSON.stringify(dta));

			let headers = {
				'X-Requested-With' : 'XMLHttpRequest',
				'X-CSRF-TOKEN' : session_CSRF_token,
				'Accept' : 'application/json',
				// 'Content-Type' : 'multipart/form-data',
			};
			const prff = JSON.parse(localStorage.getItem(pref_auth));
			if (prff !== null) {
				headers['Authorization'] = `Bearer ${prff.value}`
			}

			let body = mt == "GET" || mt == 'HEAD' ? null : (use_as_is ? dta : JSON.stringify(dta));

			// alert_info(JSON.stringify(headers));
			// console.log(`${fetch_bypass}: `,dta);

			let req = await fetch(p,{
				method: mt.toUpperCase(),
				headers: headers,
				// credentials: 'same-origin',
				body: body,
			});

			if(!req.ok){
				if(req.status == 422){
					throw new Error(`[${req.status}] -> some required fields are missing`);
				} else if(req.status == 419){
					throw new Error(`[${req.status}] -> Your session has expired, reload the page to continue`);
				}

				throw new Error(`[${req.status}] -> ${req.statusText}`);
			}

			return await req.json();
		} catch (error){
			alert_danger(error);
			throw new Error(error);
		}
	}
}

curfun = simple_fetch;
if(window[curfun] == undefined){
	window[curfun] = async (p,dta = {},mt = 'POST') => {
		try{
			alert_silent({to: p,data: dta,method: mt});

			dta[fetch_identifier] = 'yes';
			// alert_dark(JSON.stringify(dta));

			mt = mt.toUpperCase();
			let body = mt == "GET" || mt == 'HEAD' ? null : JSON.stringify(dta);

			// alert_info(JSON.stringify(headers));
			// console.log(`${fetch_bypass}: `,dta);

			let req = await fetch(p,{
				method: mt,
				// credentials: 'same-origin',
				body: body,
			});

			if(!req.ok){
				throw new Error(`[${req.status}] -> ${req.statusText}`);
			}

			return await req.json();
		} catch (error){
			alert_danger(error);
			throw error;
		}
	}
}

curfun = "simple_fetcher";
if(window[curfun] == undefined){
	window[curfun] = async (p,dta = {},mt = 'POST') => {
		try{
			alert_silent({to: p,data: dta,method: mt});

			dta['viaFetch'] = 'yes';
			// alert_dark(JSON.stringify(dta));

			my_CSRF_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

			let headers = {
				'X-Requested-With' : 'XMLHttpRequest',
				'X-CSRF-TOKEN' : my_CSRF_token,
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			};

			mt = mt.toUpperCase();
			let body = mt == "GET" || mt == 'HEAD' ? null : JSON.stringify(dta);

			// alert_info(JSON.stringify(headers));
			// console.log(`${fetch_bypass}: `,dta);

			let req = await fetch(p,{
				method: mt,
				// credentials: 'same-origin',
				headers: headers,
				body: body,
			});

			if(!req.ok){
				throw new Error(`[${req.status}] -> ${req.statusText}`);
			}

			return await req.json();
		} catch (error){
			alert_danger(error);
			throw error;
		}
	}
}

function getFormdata(formElement) {
	if (!(formElement instanceof HTMLFormElement)) {
		throw new Error('Input must be a <form> element');
	}

	if (!formElement.reportValidity()) {
		return null; // Validation failed
	}

	return new FormData(formElement);
}

function responseHandler(w,callback,args = undefined,quiet = false,skip_prepro = false) {
	console.log('response_handler: ',w);

	const runcallback = () => {
		if(callback != undefined || typeof callback === 'function'){
			args = args ?? w;
			callback(args);
		}
	}

	if(skip_prepro){
		runcallback();
	}

	if(w.success){
		if(w.result){
			if(!quiet) {alert_success(w.message);}

			runcallback();
		} else {
			if(!quiet) alert_warning(w.message);
		}
	} else {
		alert_warning('sorry, you arent logged in. lets fix that',12);
		setTimeout(() => {
			// window.location.reload();
			// window.location.assign('./login');
		}, 3000);
	}
}

function openModal(id){
	toggleShow(`#${id}`);
}

// systems and tools
	// dark / light mode switch setup
		let cur_ui_mode = "dark";
		let mode_timeout = undefined;

		window['setup_uimode'] = () => {
			let now = new Date();
			let hr = now.getHours();
			let mode = hr >= 19 ? "dark" : "light";

			if(cur_ui_mode.toLowerCase() != mode){
				alert_info(`changing to ${mode} mode`);
			}

			cur_ui_mode = mode;
			set_ui_mode();

			if(mode_timeout !== undefined){
				clearTimeout(mode_timeout);
			}
			mode_timeout = setTimeout(() => {
				setup_uimode();
			},20000);
		}
		window['toggle_ui_mode'] = () => {
			if(mode_timeout !== undefined){
				clearTimeout(mode_timeout);
			}

			let curmode = cur_ui_mode;
			let newmode = curmode == "dark" ? "light" : "dark";
			cur_ui_mode = newmode;
			set_ui_mode();
		}
		window['set_ui_mode'] = () => {
			let cls = cur_ui_mode == 'dark' ? 'fa fa-sun' : 'fa fa-moon';
			let cls2 = cur_ui_mode == 'dark' ? 'light' : 'dark';

			mode_indicator = document.querySelector('#mode_indicator');
			if(mode_indicator != undefined){
				mode_indicator.innerHTML = `<i class="${cls}"></i>`;
				mode_indicator.className = `btn btn-${cls2.toLowerCase()} themeround`;
			}

			document.body.dataset.mode = cur_ui_mode;
		}

