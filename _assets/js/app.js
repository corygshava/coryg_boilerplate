
const fetch_bypass = "fetch_bypass_" + mekRandomString(5);
const fetch_bypass_fyls = "fetch_bypass_fyls_" + mekRandomString(5);
const simple_fetch = "simple_fetch_bypass_" + mekRandomString(5);
const session_CSRF_token = "rnvar_" + mekRandomString(12);
const fetch_identifier = "viaFetch";
let curfun = "rnvar_" + mekRandomString(3);
const confirm_callback = "rnvar_" + mekRandomString(12);
const confirm_canceller = "rnvar_" + mekRandomString(10);

let variableAtlas = {
	'get_input_inter': mekRandomString(12),
};

// runtime ui items
var the_modal = undefined;
var the_modal_toggler = undefined;
var confirm_modal = undefined;
var confirm_toggler = undefined;

// fetch utils
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

// initialisers
	curfun = "mekXtras";
	if(window[curfun] == undefined){
		window[curfun] = (m) => {
			// alert_info('xtras made');
			console.log('made the xtras');
			dft_holder = document.querySelector('#app_ui');

			// alert_info('making extras');
			alert_silent('making extras');

			// make the confirmer modal
			if(true && confirm_modal === undefined){
				let conid = "confirmerBox_" + mekRandomString(3);
				let desig = `#${conid}`;

				let b = document.createElement('div');

				b.className = "modal";
				// b.style.display = "none";
				b.id = conid;
				b.dataset.shown = "0";
				b.innerHTML = `
					<div class="modal-dialog modal-lg" role="document">
						<div class="modal-content themeround borderless panelbg">
							<div class="modal-header">
								<span class="h3 modal-title" id="password_confo_title">Confirm your Password</span>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close" data-runme="password_confo_clearghost"><span aria-hidden="true">&times;</span></button>
							</div>
							<div class="modal-body">
								<!-- Multiple inputs -->
								<form id="confo_password" action="./op/change_password" data-onsubmit="confirmPassword" data-blockdefault="yes" data-callback="form_confo_afterfx">
									<div class="input-group-custom">
										<div class="form-group">
											<label class="form-label" for="admin_password">Your Password</label>
											<input type="password" class="form-control-custom" id="admin_password" name="admin_password" placeholder="enter your password for authorization" required>
										</div>
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="mybtn secondary" data-dismiss="modal" data-runme="password_confo_clearghost" data-subrole="cancel">Cancel</button>
								<button type="button" class="mybtn primary" data-submitme="#confo_password" data-subrole="continue">Continue</button>
							</div>
						</div>
					</div>
				`;

				let btn = document.createElement('button');
				btn.classList.add('w3-hide');
				// btn.dataset.toggler = desig;
				// btn.dataset.onshow = "flex";
				btn.dataset.toggle = "modal";
				btn.dataset.target = desig;

				document.body.appendChild(b);
				document.body.appendChild(btn);
				confirm_modal = b;
				confirm_toggler = btn;
			}

			// make the common modal
			conid = "modalBox_" + mekRandomString(3);
			desig = `#${conid}`;

			b = document.createElement('div');

			b.className = "modal _mymodal fade";
			b.style.display = "none";
			b.id = conid;
			b.dataset.shown = "0";
			b.innerHTML = `
				<div class="modal-dialog" role="document">
					<div class="modal-content panelbg modal-md borderless themeround">
						<div class="modal-header">
							<div>
								<span class="modal-title h4" id="d_mdl_title">Modal title</span>
								<span class="modal-subtitle" style="font-size: 0.9rem" id="d_mdl_subtitle">default modal subtitle</span>
							</div>
							<button type="button themetxt" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true" class="modetxt">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							default modal contents
						</div>
						<div class="modal-footer">
							<button type="button" class="mybtn secondary sm" data-dismiss="modal" data-subrole="cancel">cancel</button>
							<button type="button" class="mybtn primary sm" data-subrole="continue">continue &raquo;</button>
							<div class="xtra"></div>
						</div>
					</div>
				</div>
			`;

			let btnguy = document.createElement('div');
			btnguy.id = 'common_modal_toggler_holder';
			btnguy.classList.add('w3-hide');
			btnguy.innerHTML = `
				<button type="button" class="btn btn-primary btn-sm w3-hide" id="common_modal_toggler" data-toggle="modal" data-target="${desig}" data-role="toggleModal">Launch Modal</button>
			`;

			document.body.appendChild(b);
			document.body.appendChild(btnguy);

			// alert_info('med modal');
			alert_silent('med modal');
			setTimeout(() => {
				the_modal = b;
				the_modal_toggler = btnguy.querySelector('button');
			},300);

			// refresh UI when everything is done
			refreshUI(100);
		}
	}

	callOnDocLoad.push({act: window[curfun]});

// html generators
	function mekButton(pr = {caption: "",type: "button",icon:"",_props: "",_class:"",btype: "primary",act: undefined}) {
		pr = {caption: "",type: "button",icon:"",_props: "",_class:"",btype: "x",act: undefined,...pr};

		let caption = pr.caption || "cap";
		let type = pr.type || "button";
		let icon = pr.icon || "";
		let _props = pr._props || "data-genui";
		let og_class = pr._class || "xx";
		let _class = '';
		let mytype = pr.btype || "x";
		let act = pr.act || undefined;

		if(mytype != undefined){
			_class += `mybtn ${mytype}`;
		} else if(mytype == "x"){
			_class += "mybtn primary";
		} else if(mytype == null){
			_class += '';
		}

		let mfun_code = undefined;
		_class = `${og_class} ${_class}`;

		if(typeof act == "function"){
			// create a function stored in the window property so that it can be run later via clicking the button
			// potential memory leak though
			mfun_code = "runtime_act_" + mekRandomString(4);
			window[mfun_code] = () => {
				act();
			};

			_props += ` data-runme="${mfun_code}"`;

			setTimeout(() => {
				refreshUI();
			}, 200);
		}

		return `<button type="${type}" class="${_class}" ${_props}>${caption} <i class="fa ${icon}"></i></button>`
	}
	function mekInputholder(params) {
		const dftdata = {
			label: "input",
			field: "inp_name",
			typ:"text",
			placeholder: undefined,
			props: undefined,
			_inp_props: undefined,
			_inp_classes: undefined,
			required: false
		};

		params = {...dftdata,...params};

		let field = params.field || "input_field_"+mekRandomString(3);
		let label = params.label || field;
		let typ = params.typ || "text";
		let placeholder = params.placeholder || `enter ${label} here`;
		let props = params.props || 'data-noprops';
		let val = params.value || '';
		let _inp_props = params._inp_props || '';
		let _inp_req = params.required ? "required" : "";
		let _inp_classes = params._inp_classes || "no_additional_classes";

		let xtrs = props == undefined ? "" : props;

		placeholder = placeholder == undefined ? `enter ${label} here...` : placeholder;

		let inputht = `<input class="form-control-custom ${_inp_classes}" type="${typ}" name="${field}" id="${field}" placeholder="${placeholder}" ${_inp_props} ${_inp_req} value="${val}">`;

		if(typ == 'select'){
			let optht = ``;

			let opts = params.options ?? [];

			opts.forEach(o => {
				optht += `<option value="${o.value}">${o.caption ?? o.value}</option>`;
			})

			inputht = `
				<select class="form-control-custom ${_inp_classes}" name="${field}" id="${field}" ${_inp_props} ${_inp_req}>
					<option disabled>${placeholder}</option>
					${optht}
				</select>
			`;
		} else if(typ == "textarea"){
			inputht = `<textarea class="form-control-custom ${_inp_classes}" rows="3" name="${field}" id="${field}" placeholder="${placeholder}" ${_inp_props} ${_inp_req}>${val}</textarea>`
		}

		return `
			<div class="inputholder" ${props || "data-noprops"}>
				<label class="form-label" for="${field}">${label} ${params.required === true ? '*' : ''}</label>
				${inputht}
			</div>
		`;
	}
	function mekForm(m) {
		let dftdata = {
			inputs: [],
			action: "",
			method: "get",
			onsubmit: "",
			props: `data-mymessage="info submitted successfully"`,
			extrahtml_pre: '',
			extrahtml_post: '',
			blockDefault: false,
			showbutton: true,
		};

		let use = {...dftdata,...m};

		let _sub = use.onsubmit == "" ? undefined : use.onsubmit;
		let _submitter = _sub == undefined ? "" : `data-onsubmit="${_sub}"`;
		let _props = use.props;
		let _block = use.blockDefault ? "yes" : "no";

		let outht = `
			<form class="formguy" action="${use.action}" method="${use.method}" ${_props} ${_submitter} data-blockdefault="${_block}">
				${use.extrahtml_pre}
		`;
		let submitBtn = use.showbutton ? mekButton({caption: "submit data",btype: "primary",type:"submit"}) : '';

		use.inputs.forEach(i => {
			outht += mekInputholder(i);
		})

		outht += `
				${use.extrahtml_post}
				<div class="distance-sm">
					${submitBtn}
				</div>
			</form>
		`;

		return outht;
	}

	const mekModal = (d) => {
		alert_dark('making the modal');
		const dft = {title: 'modal',sub: '<i>blank modal</i>',content: 'modal content appears here',has_cancel: true, has_continue: true,extra_footer: ''};
		d = {...dft,...d};

		let mdl = the_modal;

		const title = mdl.querySelector('.modal-title');
		const subtitle = mdl.querySelector('.modal-subtitle');
		const con = mdl.querySelector('.modal-body');

		// modal content
		title.innerHTML = d.title;
		subtitle.innerHTML = d.sub;
		con.innerHTML = d.content;

		// modal interface
		let con_btn = mdl.querySelector(`[data-subrole="continue"]`);
		let cancel_btn = mdl.querySelector(`[data-subrole="cancel"]`);
		let cls_con_btn = d.has_continue ? 'remove' : 'add';
		let cls_cancel_btn = d.has_cancel ? 'remove' : 'add';

		con_btn.classList[cls_con_btn]('w3-hide');
		cancel_btn.classList[cls_cancel_btn]('w3-hide');

		let mdl_footer = mdl.querySelector('.modal-footer');
		mdl_footer.querySelector('.xtra').innerHTML = d.extra_footer;

		// con_btn.innerHTML = cls_con_btn;
		// cancel_btn.innerHTML = cls_cancel_btn;

		// little touches
		let con_cls = (!(d.has_cancel) && !(d.has_continue) && (d.extra_footer == undefined || d.extra_footer == ''));

		let cls_mdl_footer = con_cls ? 'add' : 'remove';
		mdl_footer.classList[cls_mdl_footer]('border-0');

		let mdl_header = mdl.querySelector('.modal-header');
		let cls_mdl_header = con_cls ? 'add' : 'remove';
		mdl_header.classList[cls_mdl_header]('border-bottom');

		// alert_danger('what is this')

		// finalizer
		the_modal_toggler.click();
		refreshUI(200);
	}


// mechanisms and tools
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
				let cls_ = mode_indicator.dataset.myclass || `btn themeround`;
				mode_indicator.className = `${cls_} altmodetxt bg-${cls2.toLowerCase()}`;

				if(mode_indicator.dataset.curmode != cur_ui_mode){
					mode_indicator.animate([
						{rotate: '0deg'},
						{rotate: '360deg'},
					],{duration: 1200,easing: 'ease-out'});
				}

				mode_indicator.dataset.curmode = cur_ui_mode;
			}

			document.body.dataset.mode = cur_ui_mode;
		}
	
	// get input mech
		window['get_text_fields'] = (el) => {
			if(!(el instanceof HTMLFormElement)){
				alert_danger('invalid procedure for get_text_fields');
				return {};
			}

			const fdata = new FormData(el);
			const _json = fdata2json(fdata);

			function fdata2json(fdta) {
				const json = {};

				for (const [key, value] of fdta.entries()) {
					// Skip File objects
					if (value instanceof File) {
						continue;
					}

					// Handle multiple values for the same key (checkboxes, multi-select)
					if (json[key] !== undefined) {
						if (!Array.isArray(json[key])) {
							json[key] = [json[key]];
						}
						json[key].push(value);
					} else {
						json[key] = value;
					}
				}

				return json;
			}

			return _json;
		}
		window['get_input'] = (title,fields = [],callback) => {
			alert_dark('getting input');
			let modalBtn = the_modal_toggler;
			let dashmodal = the_modal;
			let d_content = dashmodal.querySelector('.modal-content');

			let formsel = 'data-subrole="gobtn"';
			let mod_ht = mekForm({
				inputs: fields,
				action: "",
				method: "post",
				onsubmit: "get_input_callback",
				props: `${formsel} data-mymessage="info submitted successfully"`,
				extrahtml_pre: '',
				extrahtml_post: '',
				blockDefault: true,
				showbutton: false,
			});

			setTimeout(() => {
				mekModal({
					title: title,
					sub: 'enter the required value to continue',
					content: mod_ht,
					has_cancel: false,
					has_continue: false,
					extra_footer: mekButton({
						btype: 'primary',
						caption: 'continue <i class="fa fa-angle-double-right"></i>',
						_props: ` data-submitme='[${formsel}]'`,
					})
				});
			},300);

			window[variableAtlas['get_input_inter']] = callback;

			return;
			// from runtime stuff

			d_content.innerHTML = '';

			// set up the modal
			d_content.innerHTML = mekForm({
				inputs: fields,
				action: "",
				method: "post",
				onsubmit: "get_input_callback",
				props: `${formsel} data-mymessage="info submitted successfully"`,
				extrahtml_pre: '',
				extrahtml_post: '',
				blockDefault: true,
				showbutton: false,
			});
			modalBtn.click();

			// this code spawns a form with fields
			// that takes inputs and a calls

			window[variableAtlas['get_input_inter']] = callback;

			refreshUI(100);
		}

		window['get_input_callback'] = (el) => {
			let cl_btn = the_modal_toggler;

			if(cl_btn == undefined){
				alert_danger('close button not found')
				return;
			} else {
				// console.log('button: ',cl_btn);
				// return;
			}

			cl_btn.click();

			let fdata = get_text_fields(el);
			alert_silent('gotten input info');
			console.log('data from get_input: ',fdata);

			window[variableAtlas['get_input_inter']](fdata);
		}
	
	// confirm action mech
		function confirmAction(title=undefined,msg=undefined,callback=() => {alert_warning('testing dialog confirmation')},keepopen = false,canceller=()=>{}) {
			if(typeof callback != 'function'){
				alert_danger('invalid callback');
				return;
			}

			title = title == undefined ? 'Confirm Action' : title;
			msg = msg == undefined ? 'Proceed with action' : msg;

			const cont_btn = confirm_modal.querySelector('[data-subrole="continue"]');
			const closebtn = confirm_modal.querySelector('[data-subrole="cancel"]');
			const txt = confirm_modal.querySelector('.modal-body');
			const hed = confirm_modal.querySelector('.modal-title');

			txt.innerHTML = msg;
			hed.innerHTML = title;

			window['confirm_callback_called'] = false;
			window['confirm_canceller_called'] = false;

			window[confirm_callback] = (n) => {
				if(window['confirm_callback_called']){
					alert_silent('double calling detected for `confirm_callback`')
					return;
				}
				window['confirm_callback_called'] = true;

				callback();

				if(!keepopen){
					confirm_toggler.click();
				}
			};
			window[confirm_canceller] = (n) => {
				if(window['confirm_canceller_called']){
					alert_silent('double calling detected for `confirm_canceller`')
					return;
				}
				window['confirm_canceller_called'] = true;

				canceller();
			};

			if(cont_btn.dataset.wasset == undefined){
				cont_btn.addEventListener('click',() => {
					window[confirm_callback]();
					cont_btn.dataset.wasset = "imset";
					// alert_success('confirmer');
				})
			}
			if(closebtn.dataset.wasset == undefined){
				closebtn.addEventListener('click',() => {
					window[confirm_canceller]()
					closebtn.dataset.wasset = "imset";
					confirm_toggler.click();
					// alert_danger('cancelling');
				});
			}

			confirm_toggler.click();
		}
		window['password_confo_clearghost'] = () => {
			killghost('confirmPasswordCallback');
		}

