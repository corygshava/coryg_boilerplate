// savehelper
class _savehelper {
	// utilities can be called from anywhere
		static family = new Set();
		static updateAll(){
			let fam = _savehelper.family;
			/*
			for(const item in fam){
				// loop style 1
			}
			// */

			fam.forEach((f,v,all) => {
				f.refreshData();
			})
		}
		static getItem(pref,preparse=false){
			let d = localStorage.getItem(pref);
			return _savehelper.preparse_items(d,preparse);
		}
		static getItem_Flash(pref, preparse){
			let d = sessionStorage.getItem(pref);
			return _savehelper.preparse_items(d,preparse);
		}
		static preparse_items(d,doit = false){
			if(!doit){
				return d;
			}

			try{
				d = JSON.parse(d);
			} catch(err) {
				console.error(err);
				return undefined;
			}

			return d;
		}
		static pre_process(wot){
			if(typeof wot == 'string'){
				return wot;
			}

			let outp = null;

			try{
				outp = JSON.stringify(wot);
			} catch(err) {
				console.error(err);
				return null;
			}

			return outp;
		}
		static setItem(pref,con = undefined, preparse = false){
			let tosave = _sh.pre_process(con);
			localStorage.setItem(pref, tosave);
			return _savehelper.getItem(pref);
		}
		static setItem_Flash(pref,con = undefined, preparse = false){
			let tosave = _sh.pre_process(con);
			sessionStorage.setItem(pref, tosave);
			return _savehelper.getItem_Flash(pref);
		}

	// identity data
		serial = '--xx--';
		name = 'no name';
		born_at = undefined;
		config = undefined;
		defaultConfig = {
			primaryKey: 'recid',
			engine: 'localStorage',		// where the data will be saved
			use_prefix: true,			// if it should add the app_prefix or not
			pref: 'default_pref',		// the storage key
			multiple: true,			// for things with more than one record
			autoload: true,				// should it get the data automatically when loaded
		};
		data = undefined;

	// runtime data
		said = [];
		mylogs = [];

	// main methods
		constructor(config = {}) {
			_savehelper.family.add(this);
			let dft = this.defaultConfig;
			let cfg = {...dft, ...config};

			// do some post processing on the data
			if(config != undefined){
				if(typeof config.pref == 'string' && cfg.use_prefix){
					cfg.pref = `${app_prefix}${cfg.pref}`;
				}
			}

			this.serial = mekRandomString(7);
			this.born_at = new Date();
			this.name = cfg.name;
			this.is_multiple = cfg.multiple;

			this.config = cfg;

			if(cfg.autoload){
				this.getData();
			}
		}

		say = (wot, inform = false) => {
			this.said.push({words: wot, when: (new Date()).toISOString()});

			if(inform){
				alert_info(`[${this.name}] ${wot}`,8);
			}
		}
		logme = (wot) => {
			let n = {
				created_at: (new Date()).toISOString(),
				content: wot,
			};

			this.mylogs.push(n);
		}
		refreshData = () => {
			this.say('refreshing data',1==1);
			this.getData();
		}

	// data ops
		getData = () => {
			let cfg = this.config;
			let data = undefined;

			if(cfg.engine.toLowerCase() == 'localstorage'){
				data = _sh.getItem(cfg.pref,true);
			} else {
				data = _sh.getItem_Flash(cfg.pref,true)
			}

			this.data = data;
			return this;
		}
		setData = (dta) => {
			let cfg = this.config;
			let data = this.data;
			let nowstring = (new Date()).toISOString();

			this.say('starting save process');
			// console.log(`saving ${cfg.name}`,cfg);

			if(!cfg.multiple){
				// assumes you passed an object
				// let dft = {};

				if(data == undefined){
					dta.created_at = nowstring;
				}

				dta.updated_at = nowstring;
			}

			this.data = dta;
			this.say('saving data');
			this.saveDataRaw();

			return this;
		}
		saveDataRaw = () => {
			let cfg = this.config;
			let data = this.data;
			data = data == undefined ? null : data;

			// console.log(`saving raw ${cfg.name}`,cfg);

			if(cfg.engine.toLowerCase() == 'localstorage'){
				this.say('saving to local');
				_sh.setItem(cfg.pref,data);
			} else {
				this.say('saving to session');
				_sh.setItem_Flash(cfg.pref,data);
			}
		}

		find_my_id = (rec) => {
			let data = this.data || [];
			let recid = undefined;
			let primaryKey = this.config.primaryKey;
			let keyval = typeof rec == 'string' ? rec : rec[primaryKey];

			data.forEach((d,id) => {
				if(d[primaryKey] == keyval){
					recid = id;
				}
			});

			return recid;
		}
		find = (val) => {
			let data = this.data || [];
			let primaryKey = this.config.primaryKey;
			let found = undefined;

			// console.log('all data',data)

			data.forEach((d,id) => {
				let v = d[primaryKey];
				// console.log(`this: ${v}, wanted: ${val}`);
				if(d[primaryKey] == val){
					found = d;
				}
			});

			return found;
		}

		add_one = (rec) => {
			let cfg = this.config;
			let data = this.data;
			let nowstring = (new Date()).toISOString();

			if(!(cfg.multiple)){
				this.say('you can only add to an item with multiple entries',true);
				return;
			}

			rec[cfg.primaryKey] = mekRandomString(12);
			rec.created_at = nowstring;
			rec.updated_at = nowstring;

			if(data == undefined){
				data = [];
			}

			data.push(rec);

			this.data = data;
			this.saveDataRaw();

			return rec;
		}

		update = (rec) => {
			let cfg = this.config;
			let data = this.data;
			let nowstring = (new Date()).toISOString();
			rec.updated_at = nowstring;

			if(!cfg.multiple){
				data = rec;
			} else {
				let recid = this.find_my_id(rec);

				if(recid == undefined){
					this.say('invalid record id', true);
				} else {
					data[recid] = rec;
				}
			}

			this.data = data;
			this.saveDataRaw();

			return rec;
		}
		delete = (keyval) => {
			let cfg = this.config;
			let data = this.data;
			let nowstring = (new Date()).toISOString();

			if(!cfg.multiple){
				// rec.updated_at = nowstring;
				data = null;
			} else {
				let recid = this.find_my_id(keyval);

				if(recid == undefined){
					this.say('invalid record id', true);
				} else {
					// data[recid] = rec;
					data = [...data].toSpliced(recid,1);
				}
			}

			this.data = data;
			this.saveDataRaw();
		}
}
class _sh extends _savehelper{
	constructor(cfg){
		cfg.source = "shortener";
		super(cfg);
	}
}
