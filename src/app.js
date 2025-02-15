var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
function autobind(target, name, descriptor) {
    console.log(descriptor);
    var originalMethod = descriptor.value;
    console.log(originalMethod);
    var adjDescriptor = {
        configurable: true,
        // enumerable : false,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
var ProjectInput = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _submitHandler_decorators;
    return _a = /** @class */ (function () {
            function ProjectInput() {
                this.templateElement = __runInitializers(this, _instanceExtraInitializers);
                this.templateElement = document.getElementById('project-input');
                this.hostElement = document.getElementById('app');
                var importedContent = document.importNode(this.templateElement.content, true);
                this.element = importedContent.firstElementChild;
                this.element.id = 'user-input';
                this.titleInputElement = this.element.querySelector('#title');
                this.descriptionInputElement = this.element.querySelector('#description');
                // !! OR HTMLInputElement
                this.peopleInputElement = this.element.querySelector('#people');
                this.button = this.element.querySelector('button');
                // console.log(this.titleInput.value);
                this.configure();
                this.attach();
            }
            ProjectInput.prototype.submitHandler = function (event) {
                event.preventDefault();
                console.log(this.titleInputElement.value);
                console.log(this.descriptionInputElement.value);
                console.log(this.peopleInputElement.value);
            };
            ProjectInput.prototype.configure = function () {
                this.element.addEventListener('submit', this.submitHandler);
            };
            ProjectInput.prototype.attach = function () {
                this.hostElement.insertAdjacentElement('afterbegin', this.element);
            };
            return ProjectInput;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _submitHandler_decorators = [autobind];
            __esDecorate(_a, null, _submitHandler_decorators, { kind: "method", name: "submitHandler", static: false, private: false, access: { has: function (obj) { return "submitHandler" in obj; }, get: function (obj) { return obj.submitHandler; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var one = new ProjectInput;
