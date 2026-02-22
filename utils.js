var use_canvas = true;
var gl;
var ctx;
var canvas2D;
var canvas;

function initCtx() {
	canvas2D = document.getElementById("canvas2d");
	ctx = canvas2D.getContext("2d");

	canvas = document.getElementById("canvas");
	gl = canvas.getContext("2d", { alpha: false });
	setCanvasQuality();
}

function setCanvasQuality() {
	gl.imageSmoothingQuality = "high";
	gl.imageSmoothingEnabled = true;
	gl.webkitImageSmoothingEnabled = true;
	gl.msImageSmoothingEnabled = true;
}

EasingFunctions = {
	// no easing, no acceleration
	linear: function (t) { return t },
	// accelerating from zero velocity
	easeInQuad: function (t) { return t*t },
	// decelerating to zero velocity
	easeOutQuad: function (t) { return t*(2-t) },
	// acceleration until halfway, then deceleration
	easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	// accelerating from zero velocity 
	easeInCubic: function (t) { return t*t*t },
	// decelerating to zero velocity 
	easeOutCubic: function (t) { return (--t)*t*t+1 },
	// acceleration until halfway, then deceleration 
	easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
	// accelerating from zero velocity 
	easeInQuart: function (t) { return t*t*t*t },
	// decelerating to zero velocity 
	easeOutQuart: function (t) { return 1-(--t)*t*t*t },
	// acceleration until halfway, then deceleration
	easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	// accelerating from zero velocity
	easeInQuint: function (t) { return t*t*t*t*t },
	// decelerating to zero velocity
	easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
	// acceleration until halfway, then deceleration 
	easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
	easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
	// elastic bounce effect at the end
    easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
    // elastic bounce effect at the beginning and end
    easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.01 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 },
	easeInSin: function (t) {return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);},
	easeOutSin : function (t) {return Math.sin(Math.PI / 2 * t);},
	easeInOutSin: function (t) {return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;},
	easeOutBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeToBig: function (t, b, c, d) {
		var ts=(t/=d)*t;
		var tc=ts*t;
		return b+c*(-4*tc*ts + 11*ts*ts + -6*tc + -6*ts + 6*t);
	},
	easeToSmall: function (t, b, c, d) {
		var ts=(t/=d)*t;
		var tc=ts*t;
		return b+c*(tc + -3*ts + 3*t);
	},
	easeLinear: function (t, b, c, d) {
		t/=d;
		return b+c*(t);
	},
	//progress, this.startSize, this.newSize - this.startSize, this.duration
	easeToBigCell: function (t, b, c, d) {
		var w = b/20; /* % от шара %*/
		var ts=(t/=d)*t;
		var tc=ts*t;
		return c+(b*(-4*tc*ts + 11*ts*ts + (-w)*tc + -6*ts + (w)*t));
	}
}

var texturesLib = {
	lastId: 0,
	textures: {},
	levelImg: null,
	rangImg: [null, null, null, null, null],
	clanImg: [null, null, null, null, null],
	muteImg: null,
	boteImg: null,

	count: 0,
	loaded: 0,

	getNewId: function() {
		this.lastId ++;
		return this.lastId;
	},

	getTexture: function(tx_name, tiled, allowSmooth) {
		if (tx_name == null || tx_name == '') {
			return null;
		}
		if (typeof this.textures[tx_name] == 'undefined' || this.textures[tx_name] == null) {
			this.textures[tx_name] = {id: texturesLib.getNewId(), count: 0, loaded: false, img: null, tiled: tiled};
			texturesLib.load(this.textures[tx_name], '/img/opengl/'+ tx_name, allowSmooth);
			// console.log("loadTexture: "+ tx_name);
		}
		// this.textures[tx_name].count ++;
		return this.textures[tx_name];
	},

	free: function() {
		//this.lastId = 0;
		//this.textures = {};
		for (var key in this.textures) {
			if (typeof this.textures[key].isSkin != 'undefined' && this.textures[key].isSkin) {
				delete(this.textures[key]);
			}
		}

		if (this.levelImg == null) {
			this.levelImg = new Image();
			this.levelImg.src = '/img/opengl/items/level.png';
			this.clanImg = new Image();
			this.clanImg.src = '/img/opengl/items/clan_icon.png';
			for (var i = 1; i <= 5; i ++) {
				this.rangImg[i] = new Image();
				this.rangImg[i].src = '/img/opengl/items/rang_'+ i +'.png';
			}
			this.muteImg = new Image();
			this.muteImg.src = '/img/opengl/other/mute.png';
			
			this.boteImg = new Image();
			this.boteImg.src = '/img/opengl/other/bote.png';
		}
	},

	freeTexture: function(id) {
		// return false;
		// for (var tx_name in this.textures) {
			// if (this.textures[tx_name].id == id) {
				// this.textures[tx_name].count--;
				// if (this.textures[tx_name].count == 0) {
					// console.log("freeTexture: " + idx);
					// this.textures[tx_name] = null;
					// delete(this.textures[tx_name]);
				// }
				// break;
			// }
		// }
	},

	load: function(texture, tx_name, allowSmooth) {
		this.count ++;
		var lib = this;
		texture.img = new Image();
		texture.img.onload = function() {
			lib.loaded ++;
			game.onLoadingProgress();
			if (texture.tiled) {
				texture.pattern = gl.createPattern(texture.img, 'repeat');
			}
			texture.loaded = true;
		}
		texture.img.src = tx_name;
	}
}

var meshesLib = {
	meshes: {},

	getMesh: function(name) {
		if (name == null) {
			return null;
		}
		if (typeof this.meshes[name] == 'undefined' || this.meshes[name] == null) {
			this.meshes[name] = {
				vBuffer: gl.createBuffer(),
				txBuffer: [gl.createBuffer()],
				count: 0
			}
		}
		this.meshes[name].count++;
		return this.meshes[name];
	},

	freeMesh: function(id) {
	}
}
function getPlayerMesh() {
	return null;
}

function createPlayerSkin(items, img_out, wingsColor) {
	if (typeof items == 'undefined') {
		return null;
	}
	if (img_out == null) {
		var texture = {id: texturesLib.getNewId(), loaded: false, img: null, tiled: false, wKoef: 1, hKoef: 1, isSkin: true};
	}

	var face = {
		canvas: null,
		ctx: null,

		count: 0,
		loaded: 0,

		skin: {
			shadow: null,
			wings: null,
			body: null,
			accessory: null,
			mouth: null,
			eyes: null,
			beard: null,
			dress: null,
			armor: null,
			hair: null,
			hat: null
		},

		init: function() {
			this.canvas = document.createElement('canvas');
			this.canvas.width  = 512;
			this.canvas.height = 512;
			this.ctx = this.canvas.getContext("2d");

			this.skin.shadow = {id: 0, img: null},
			this.skin.body = {id: items[0], img: null},
			this.skin.eyes = {id: parseInt(items[1]), img: null},
			this.skin.mouth = {id: parseInt(items[2]), img: null},
			this.skin.beard = {id: typeof items[3] != 'undefined' && items[3] != '' ? parseInt(items[3]) : 0, img: null},
			this.skin.hair = {id: typeof items[4] != 'undefined' && items[4] != '' ? parseInt(items[4]) : 0, img: null},
			this.skin.hat = {id: typeof items[9] == 'undefined' || parseInt(items[9]) > 0 ? parseInt(items[5]) : 0, img: null},
			this.skin.dress = {id: typeof items[9] == 'undefined' || parseInt(items[9]) > 0 ? parseInt(items[6]) : 0, img: null},
			this.skin.accessory = {id: typeof items[9] == 'undefined' || parseInt(items[9]) > 0 ? parseInt(items[7]) : 0, img: null}
			this.skin.armor = {id: this.skin.accessory.id == 0 && (typeof items[11] == 'undefined' || parseInt(items[11]) > 0) ? parseInt(items[10]) : 0, img: null}
			this.skin.wings = {id: typeof items[13] == 'undefined' || parseInt(items[13]) > 0 ? parseInt(items[12]) : 0, img: null}

			this.loaded = 0;
			for (var key in this.skin) {
				if (key == 'shadow') {
					this.skin[key].img = this.loadImage('/img/opengl/items/shadow.png');
					this.count ++;
				} else
				if (key == 'armor' && this.skin[key].id > 0) {
					this.skin[key].img = this.loadImage('/img/opengl/armor/'+ this.skin[key].id +'.png');
					this.count ++;
				} else
				if (key == 'wings' && this.skin[key].id > 0) {
				    if (wingsColor == null) {
				        this.skin[key].img = this.loadImage('/img/opengl/armor/'+ this.skin[key].id +'.png');
					    this.count ++;
				    } else {
				        this.skin[key].img = this.loadImage('/img/opengl/other/skins/wings/'+ wingsColor +'.png');
					    this.count ++;
				    }
				} else
				if (this.skin[key].id != 0) {
				    if (this.skin[key].id < 1000) {
					    this.skin[key].img = this.loadImage('/img/skins/'+ key +'/'+ this.skin[key].id +'.png');
					    this.count ++;
				    } else {
				        this.skin[key].img = this.loadImage('/img/opengl/other/skins/'+ key +'/'+ this.skin[key].id +'.png');
					    this.count ++;
				    }
				}
			}
		},

		loadImage: function(src) {
			texturesLib.count ++;
			var img = new Image();
			img.src = src;
			var obj = this;
			img.onload = function(){
				texturesLib.loaded ++;
				obj.loaded ++;
				game.onLoadingProgress();
				obj.generateSkin();
			}
			return img;
		},

		generateSkin: function() {
			if (this.loaded != this.count) return;
			// console.log('New skin');
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

			var max_w = 0;
			var max_h = 0;

			for (var key in this.skin) {
				if (key == 'shadow') {
					var w = this.skin[key].img.width / 2 * 1.2;
					var h = this.skin[key].img.height / 2 * 1.2 + 100;
					max_w  = Math.max(max_w, Math.max(w, w));
					max_h  = Math.max(max_h, Math.max(h, h));
					this.ctx.drawImage(this.skin['shadow'].img, 128 * 0.8, 280, 256 * 1.2, 155 * 1.2);
				} else
				if (this.skin[key].id != 0) {
					var data = key == 'armor' || key == 'wings' ? armor_list[''+ this.skin[key].id] : skins_list[key][''+ this.skin[key].id];
					if (typeof data == 'undefined') {
						data = {
							layer: 0,
							offset: [0, 0]
						}
					}
					if (data.layer == 1) continue;
					var w = this.skin[key].img.width / 2;
					var h = this.skin[key].img.height / 2;
					max_w  = Math.max(max_w, Math.max(w + data.offset[X], w - data.offset[X]));
					max_h  = Math.max(max_h, Math.max(h + data.offset[Y], h - data.offset[Y]));
					this.ctx.drawImage(this.skin[key].img, (256 - Math.round(w)) + data.offset[X], (256 - Math.round(h)) - data.offset[Y]);
				}
			}
			key = 'accessory';
			if (this.skin[key].id != 0) {
				var data = key == 'armor' || key == 'wings' ? armor_list[''+ this.skin[key].id] : skins_list[key][''+ this.skin[key].id];
				if (data.layer == 1) {
					var w = this.skin[key].img.width / 2;
					var h = this.skin[key].img.height / 2;
					max_w  = Math.max(max_w, w + data.offset[X]);
					max_h  = Math.max(max_h, h + data.offset[Y]);
					this.ctx.drawImage(this.skin[key].img, (256 - Math.round(w)) + data.offset[X], (256 - Math.round(h)) - data.offset[Y]);
				}
			}

			if (img_out != null) {
				max_w = 220;
				max_h = 220;
			}

			var cn_out = document.createElement('canvas');
			cn_out.width  = max_w * 2;
			cn_out.height = max_h * 2;
			var ctx_out = cn_out.getContext("2d");

			ctx_out.clearRect(0, 0, cn_out.width, cn_out.height);
			ctx_out.drawImage(this.canvas, 256 - max_w, 256 - max_h, cn_out.width, cn_out.height, 0, 0, cn_out.width, cn_out.height);

			if (img_out != null) {
				// img_out.src = cn_out.toDataURL();
				$(img_out).attr('src', cn_out.toDataURL());
			} else {
				texture.img = true;
				texture.canvas = cn_out;

				texture.wKoef = max_w * 2 / 256;
				texture.hKoef = max_h * 2 / 256;
				texture.loaded = true;
			}
			this.canvas.width = 1;
			this.canvas.height = 1;
			$(this.canvas).remove();
			this.canvas = null;
			this.ctx = null;
		}
	}

	face.init();

	if (img_out == null) {
		return texture;
	}
}

function drawCanvasText(_ctx, height, txt, x, y, hsl, alpha) {
	_ctx.font = "bold "+ height +"px Ubuntu";
	_ctx.fillStyle = hsl2hex(hsl, 100, 55);
	_ctx.strokeStyle = hsl2hex(hsl, 100, 100);
	_ctx.lineJoin = 'round';
	_ctx.miterLimit = 1;
	_ctx.lineWidth = 4;

	_ctx.save();
	_ctx.globalAlpha = alpha > 0.95 ? alpha : alpha * 0.5;

	var width = (Math.floor(_ctx.measureText(txt).width) + _ctx.lineWidth * 2) / 2;
	_ctx.strokeText(txt, x + _ctx.lineWidth - width, y + height);
	_ctx.fillText(txt, x + _ctx.lineWidth - width, y + height);
	_ctx.restore();
}

function getNickLabel(nick, level, rang, color, mute, bote) {
    
	var height = 48;

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	ctx.lineJoin = 'round';
	ctx.miterLimit = 1;
	ctx.lineWidth = 10;

	var lvl_size = level > 0 ? 64 : 0;
	var rang_size = rang > 0 ? 64 : 0;
	var mute_size = mute > 0 ? 64 : 0;
	var bote_size = bote > 0 ? 64 : 0;

	if (rang > 0) {
		ctx.drawImage(texturesLib.rangImg[rang], 0, 0, rang_size, rang_size);
		rang_size += 5;
	}

	if (level > 0) {
		ctx.font = "bold "+ (height * (level < 10 ? 0.8 : 0.65)) +"px Ubuntu";
		ctx.fillStyle = '#ffffff';

		ctx.drawImage(texturesLib.levelImg, rang_size, 0, lvl_size, lvl_size);
		var x = rang_size + Math.round(lvl_size / 2) - Math.round(ctx.measureText(level).width / 2);
		ctx.fillText(level, x - 1, height - (level < 10 ? 2 : 5));
	}
	
	ctx.font = "bold "+ height +"px Ubuntu";
	ctx.fillStyle = color;
	ctx.strokeStyle = '#ffffff';

	ctx.strokeText(nick, rang_size + lvl_size + ctx.lineWidth, height);
	ctx.fillText(nick, rang_size + lvl_size + ctx.lineWidth, height);
	
	if (mute > 0) {
		ctx.drawImage(texturesLib.muteImg, rang_size + lvl_size + Math.floor(ctx.measureText(nick).width) + ctx.lineWidth * 2, 0, mute_size, mute_size);
	}
	
	if (bote > 0) {
		ctx.drawImage(texturesLib.boteImg, rang_size + lvl_size + Math.floor(ctx.measureText(nick).width) + ctx.lineWidth * 2, 3, bote_size, bote_size);
	}

	var width = bote_size + mute_size + rang_size + lvl_size + Math.floor(ctx.measureText(nick).width) + ctx.lineWidth * 2;
	var kh = 1.2;
	var kw = width / height;
	var xx = width / 512;

	var vertices = [
		-1.0 * kw,  1.0 * kh,  0.0,
		-1.0 * kw, -1.0 * kh,  0.0,
		 1.0 * kw, -1.0 * kh,  0.0,
		 1.0 * kw,  1.0 * kh,  0.0
	];
	var tx_coord = [0.0, 0.0,  0.0, 1.0,  xx, 1.0,  xx, 0.0];

	var label = newGlObject({size: 7});

	var texture = {loaded: true, img: null, tiled: false};

	label.texture_info = {};
	label.texture_info.frames = [];
	label.texture_info.size = {
		w: width,
		h: 64,
		kw: width / 64,
		kh: 1
	}
	label.texture_info.pivot = {
		x: 0,
		y: 0
	}
	label.texture_info.frames.push({
		x2d: 0,
		y2d: 0,
		w2d: width,
		h2d: 64
	});

	var _canvas = document.createElement('canvas');
	_canvas.width  = width;
	_canvas.height = 64;
	var _ctx = _canvas.getContext("2d");
	_ctx.drawImage(canvas2D, 0, 0, width, 64, 0, 0, width, 64);

	texture.img = true;
	texture.canvas = _canvas;
	_ctx = null;

	label.texture = [texture];
	label.allowDistord = false;

	return label;
}

function getClanLabel(id, name, color) {
	//s = s || 100;
	//l = l || 55;
	var height = 46;

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	ctx.lineJoin = 'round';
	ctx.miterLimit = 1;
	ctx.lineWidth = 10;
	var clan_width = 66;
	var clan_height = 71;

	ctx.drawImage(texturesLib.clanImg, 0, 0, clan_width, clan_height);
	
	ctx.font = "bold "+ height +"px Ubuntu";
	ctx.fillStyle = color;
	ctx.strokeStyle = '#ffffff';

	ctx.strokeText(name, clan_width + ctx.lineWidth, height + 5);
	ctx.fillText(name, clan_width + ctx.lineWidth, height + 5);

	var width = clan_width + Math.floor(ctx.measureText(name).width) + ctx.lineWidth * 2;
	var kh = 1.2;
	var kw = width / clan_height;
	var xx = width / 512;

	var vertices = [
		-1.0 * kw,  1.0 * kh,  0.0,
		-1.0 * kw, -1.0 * kh,  0.0,
		 1.0 * kw, -1.0 * kh,  0.0,
		 1.0 * kw,  1.0 * kh,  0.0
	];
	var tx_coord = [0.0, 0.0,  0.0, 1.0,  xx, 1.0,  xx, 0.0];

	var label = newGlObject({size: 7});

	var texture = {loaded: true, img: null, tiled: false};

	label.texture_info = {};
	label.texture_info.frames = [];
	label.texture_info.size = {
		w: width,
		h: clan_height,
		kw: width / clan_height,
		kh: 1
	}
	label.texture_info.pivot = {
		x: 0,
		y: 0
	}
	label.texture_info.frames.push({
		x2d: 0,
		y2d: 0,
		w2d: width,
		h2d: clan_height
	});

	var _canvas = document.createElement('canvas');
	_canvas.width  = width;
	_canvas.height = clan_height;
	var _ctx = _canvas.getContext("2d");
	_ctx.drawImage(canvas2D, 0, 0, width, clan_height, 0, 0, width, clan_height);

	texture.img = true;
	texture.canvas = _canvas;
	_ctx = null;

	label.texture = [texture];
	label.allowDistord = false;

	return label;
}

function getTextLabel(txt, h, s, l) {
	s = s || 100;
	l = l || 55;
	var height = 48;
	ctx.font = "bold "+ height +"px Ubuntu";

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = hsl2hex(h, s, l);
	ctx.strokeStyle = hsl2hex(h, 100, 100);
	ctx.lineJoin = 'round';
	ctx.miterLimit = 1;
	ctx.lineWidth = 10;

	ctx.strokeText(txt, ctx.lineWidth, height);
	ctx.fillText(txt, ctx.lineWidth, height);

	var width = Math.floor(ctx.measureText(txt).width) + ctx.lineWidth * 2;
	var kh = 1.2;
	var kw = width / height;
	var xx = width / 512;

	var vertices = [
		-1.0 * kw,  1.0 * kh,  0.0,
		-1.0 * kw, -1.0 * kh,  0.0,
		 1.0 * kw, -1.0 * kh,  0.0,
		 1.0 * kw,  1.0 * kh,  0.0
	];
	var tx_coord = [0.0, 0.0,  0.0, 1.0,  xx, 1.0,  xx, 0.0];

	var label = newGlObject({size: 7});

	var texture = {loaded: true, img: null, tiled: false};

	label.texture_info = {};
	label.texture_info.frames = [];
	label.texture_info.size = {
		w: width,
		h: 64,
		kw: width / 64,
		kh: 1
	}
	label.texture_info.pivot = {
		x: 0,
		y: 0
	}
	label.texture_info.frames.push({
		x2d: 0,
		y2d: 0,
		w2d: width,
		h2d: 64
	});

	var _canvas = document.createElement('canvas');
	_canvas.width  = width;
	_canvas.height = 64;
	var _ctx = _canvas.getContext("2d");
	_ctx.drawImage(canvas2D, 0, 0, width, 64, 0, 0, width, 64);

	texture.img = true;
	texture.canvas = _canvas;

	label.texture = [texture];
	label.allowDistord = false;
	_ctx = null;

	return label;
}

function freeTextLabel(mesh) {
	if (mesh != null) {
		mesh.freeBuffers();
		if (mesh.texture != []) {
			mesh.texture[0].canvas.width = 1;
			mesh.texture[0].canvas.height = 1;
			mesh.texture = [];
		}
	}
}
