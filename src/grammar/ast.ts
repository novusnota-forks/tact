import { dummySrcInfo, SrcInfo } from "./grammar";

export type AstModule = {
    kind: "module";
    imports: AstImport[];
    items: AstModuleItem[];
    id: number;
};

export type AstImport = {
    kind: "import";
    path: AstString;
    id: number;
    loc: SrcInfo;
};

export type AstModuleItem =
    | AstPrimitiveTypeDecl
    | AstFunctionDef
    | AstNativeFunctionDecl
    | AstConstantDef
    | AstStructDecl
    | AstMessageDecl
    | AstContract
    | AstTrait;

export type AstTypeDecl =
    | AstPrimitiveTypeDecl
    | AstStructDecl
    | AstMessageDecl
    | AstContract
    | AstTrait;

export type AstPrimitiveTypeDecl = {
    kind: "primitive_type_decl";
    name: AstId;
    id: number;
    loc: SrcInfo;
};

export type AstFunctionDef = {
    kind: "function_def";
    attributes: AstFunctionAttribute[];
    name: AstId;
    return: AstType | null;
    params: AstTypedParameter[];
    statements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

export type AstFunctionDecl = {
    kind: "function_decl";
    attributes: AstFunctionAttribute[];
    name: AstId;
    return: AstType | null;
    params: AstTypedParameter[];
    id: number;
    loc: SrcInfo;
};

export type AstNativeFunctionDecl = {
    kind: "native_function_decl";
    attributes: AstFunctionAttribute[];
    name: AstId;
    nativeName: AstFuncId;
    params: AstTypedParameter[];
    return: AstType | null;
    id: number;
    loc: SrcInfo;
};

export type AstConstantDef = {
    kind: "constant_def";
    attributes: AstConstantAttribute[];
    name: AstId;
    type: AstType;
    initializer: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstConstantDecl = {
    kind: "constant_decl";
    attributes: AstConstantAttribute[];
    name: AstId;
    type: AstType;
    id: number;
    loc: SrcInfo;
};

export type AstStructDecl = {
    kind: "struct_decl";
    name: AstId;
    fields: AstFieldDecl[];
    id: number;
    loc: SrcInfo;
};

export type AstMessageDecl = {
    kind: "message_decl";
    name: AstId;
    opcode: number | null;
    fields: AstFieldDecl[];
    id: number;
    loc: SrcInfo;
};

export type AstContract = {
    kind: "contract";
    name: AstId;
    traits: AstId[];
    attributes: AstContractAttribute[];
    declarations: AstContractDeclaration[];
    id: number;
    loc: SrcInfo;
};

export type AstTrait = {
    kind: "trait";
    name: AstId;
    traits: AstId[];
    attributes: AstContractAttribute[];
    declarations: AstTraitDeclaration[];
    id: number;
    loc: SrcInfo;
};

export type AstContractDeclaration =
    | AstFieldDecl
    | AstFunctionDef
    | AstContractInit
    | AstReceiver
    | AstConstantDef;

export type AstTraitDeclaration =
    | AstFieldDecl
    | AstFunctionDef
    | AstFunctionDecl
    | AstReceiver
    | AstConstantDef
    | AstConstantDecl;

export type AstFieldDecl = {
    kind: "field_decl";
    name: AstId;
    type: AstType;
    initializer: AstExpression | null;
    as: AstId | null;
    id: number;
    loc: SrcInfo;
};

export type AstReceiver = {
    kind: "receiver";
    selector: AstReceiverKind;
    statements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

export type AstContractInit = {
    kind: "contract_init";
    params: AstTypedParameter[];
    statements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

//
// Statements
//

export type AstStatement =
    | AstStatementLet
    | AstStatementReturn
    | AstStatementExpression
    | AstStatementAssign
    | AstStatementAugmentedAssign
    | AstCondition
    | AstStatementWhile
    | AstStatementUntil
    | AstStatementRepeat
    | AstStatementTry
    | AstStatementTryCatch
    | AstStatementForEach;

export type AstStatementLet = {
    kind: "statement_let";
    name: AstId;
    type: AstType | null;
    expression: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstStatementReturn = {
    kind: "statement_return";
    expression: AstExpression | null;
    id: number;
    loc: SrcInfo;
};

export type AstStatementExpression = {
    kind: "statement_expression";
    expression: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstStatementAssign = {
    kind: "statement_assign";
    path: AstExpression; // left-hand side of `=`
    expression: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstAugmentedAssignOperation =
    | "+"
    | "-"
    | "*"
    | "/"
    | "%"
    | "|"
    | "&"
    | "^";

export type AstStatementAugmentedAssign = {
    kind: "statement_augmentedassign";
    op: AstAugmentedAssignOperation;
    path: AstExpression;
    expression: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstCondition = {
    kind: "statement_condition";
    condition: AstExpression;
    trueStatements: AstStatement[];
    falseStatements: AstStatement[] | null;
    elseif: AstCondition | null;
    id: number;
    loc: SrcInfo;
};

export type AstStatementWhile = {
    kind: "statement_while";
    condition: AstExpression;
    statements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

export type AstStatementUntil = {
    kind: "statement_until";
    condition: AstExpression;
    statements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

export type AstStatementRepeat = {
    kind: "statement_repeat";
    iterations: AstExpression;
    statements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

export type AstStatementTry = {
    kind: "statement_try";
    statements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

export type AstStatementTryCatch = {
    kind: "statement_try_catch";
    statements: AstStatement[];
    catchName: AstId;
    catchStatements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

export type AstStatementForEach = {
    kind: "statement_foreach";
    keyName: AstId;
    valueName: AstId;
    map: AstExpression;
    statements: AstStatement[];
    id: number;
    loc: SrcInfo;
};

//
// Types
//

export type AstType =
    | AstTypeId
    | AstOptionalType
    | AstMapType
    | AstBouncedMessageType;

export type AstTypeId = {
    kind: "type_id";
    text: string;
    id: number;
    loc: SrcInfo;
};

export type AstOptionalType = {
    kind: "optional_type";
    typeArg: AstType;
    id: number;
    loc: SrcInfo;
};

export type AstMapType = {
    kind: "map_type";
    keyType: AstTypeId;
    keyStorageType: AstId | null;
    valueType: AstTypeId;
    valueStorageType: AstId | null;
    id: number;
    loc: SrcInfo;
};

export type AstBouncedMessageType = {
    kind: "bounced_message_type";
    messageType: AstTypeId;
    id: number;
    loc: SrcInfo;
};

//
// Expressions
//

export type AstExpression =
    | AstOpBinary
    | AstOpUnary
    | AstFieldAccess
    | AstNumber
    | AstId
    | AstBoolean
    | AstMethodCall
    | AstStaticCall
    | AstStructInstance
    | AstNull
    | AstInitOf
    | AstString
    | AstConditional;

export type AstBinaryOperation =
    | "+"
    | "-"
    | "*"
    | "/"
    | "!="
    | ">"
    | "<"
    | ">="
    | "<="
    | "=="
    | "&&"
    | "||"
    | "%"
    | "<<"
    | ">>"
    | "&"
    | "|"
    | "^";

export type AstOpBinary = {
    kind: "op_binary";
    op: AstBinaryOperation;
    left: AstExpression;
    right: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstUnaryOperation = "+" | "-" | "!" | "!!" | "~";

export type AstOpUnary = {
    kind: "op_unary";
    op: AstUnaryOperation;
    operand: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstFieldAccess = {
    kind: "field_access";
    aggregate: AstExpression; // contract, trait, struct, message
    field: AstId;
    id: number;
    loc: SrcInfo;
};

export type AstMethodCall = {
    kind: "method_call";
    self: AstExpression; // anything with a method
    method: AstId;
    args: AstExpression[];
    id: number;
    loc: SrcInfo;
};

// builtins or top-level (module) functions
export type AstStaticCall = {
    kind: "static_call";
    function: AstId;
    args: AstExpression[];
    id: number;
    loc: SrcInfo;
};

export type AstStructInstance = {
    kind: "struct_instance";
    type: AstId;
    args: AstStructFieldInitializer[];
    id: number;
    loc: SrcInfo;
};

export type AstStructFieldInitializer = {
    kind: "struct_field_initializer";
    field: AstId;
    initializer: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstInitOf = {
    kind: "init_of";
    contract: AstId;
    args: AstExpression[];
    id: number;
    loc: SrcInfo;
};

export type AstConditional = {
    kind: "conditional";
    condition: AstExpression;
    thenBranch: AstExpression;
    elseBranch: AstExpression;
    id: number;
    loc: SrcInfo;
};

export type AstId = {
    kind: "id";
    text: string;
    id: number;
    loc: SrcInfo;
};

export type AstFuncId = {
    kind: "func_id";
    text: string;
    id: number;
    loc: SrcInfo;
};

export function idText(ident: AstId | AstFuncId | AstTypeId): string {
    return ident.text;
}

export function isInt(ident: AstTypeId): boolean {
    return ident.text === "Int";
}

export function isBool(ident: AstTypeId): boolean {
    return ident.text === "Bool";
}

export function isCell(ident: AstTypeId): boolean {
    return ident.text === "Cell";
}

export function isSlice(ident: AstTypeId): boolean {
    return ident.text === "Slice";
}

export function isBuilder(ident: AstTypeId): boolean {
    return ident.text === "Builder";
}

export function isAddress(ident: AstTypeId): boolean {
    return ident.text === "Address";
}

export function isString(ident: AstTypeId): boolean {
    return ident.text === "String";
}

export function isStringBuilder(ident: AstTypeId): boolean {
    return ident.text === "StringBuilder";
}

export function isSelfId(ident: AstId): boolean {
    return ident.text === "self";
}

export function isWildcard(ident: AstId): boolean {
    return ident.text === "_";
}

export function isRequire(ident: AstId): boolean {
    return ident.text === "require";
}

export function eqNames(
    left: AstId | AstTypeId | string,
    right: AstId | AstTypeId | string,
): boolean {
    if (typeof left === "string") {
        if (typeof right === "string") {
            return left === right;
        }
        return left === right.text;
    } else {
        if (typeof right === "string") {
            return left.text === right;
        }
        return left.text === right.text;
    }
}

export const selfId: AstId = {
    kind: "id",
    text: "self",
    id: 0,
    loc: dummySrcInfo,
};

export type AstNumber = {
    kind: "number";
    value: bigint;
    id: number;
    loc: SrcInfo;
};

export type AstBoolean = {
    kind: "boolean";
    value: boolean;
    id: number;
    loc: SrcInfo;
};

export type AstString = {
    kind: "string";
    value: string;
    id: number;
    loc: SrcInfo;
};

// `null` value is an inhabitant of several types:
// it can represent missing values in optional types,
// or empty map of any key and value types
export type AstNull = {
    kind: "null";
    id: number;
    loc: SrcInfo;
};

export type AstConstantAttribute =
    | { type: "virtual"; loc: SrcInfo }
    | { type: "overrides"; loc: SrcInfo }
    | { type: "abstract"; loc: SrcInfo };

export type AstContractAttribute = {
    type: "interface";
    name: AstString;
    loc: SrcInfo;
};

export type AstFunctionAttribute =
    | { type: "get"; loc: SrcInfo }
    | { type: "mutates"; loc: SrcInfo }
    | { type: "extends"; loc: SrcInfo }
    | { type: "virtual"; loc: SrcInfo }
    | { type: "abstract"; loc: SrcInfo }
    | { type: "overrides"; loc: SrcInfo }
    | { type: "inline"; loc: SrcInfo };

export type AstTypedParameter = {
    kind: "typed_parameter";
    name: AstId;
    type: AstType;
    id: number;
    loc: SrcInfo;
};

export type AstReceiverKind =
    | {
          kind: "internal-simple";
          param: AstTypedParameter;
      }
    | {
          kind: "internal-fallback";
      }
    | {
          kind: "internal-comment";
          comment: AstString;
      }
    | {
          kind: "bounce";
          param: AstTypedParameter;
      }
    | {
          kind: "external-simple";
          param: AstTypedParameter;
      }
    | {
          kind: "external-fallback";
      }
    | {
          kind: "external-comment";
          comment: AstString;
      };

export type AstNode =
    | AstFuncId
    | AstExpression
    | AstStatement
    | AstTypeDecl
    | AstFieldDecl
    | AstTypedParameter
    | AstFunctionDef
    | AstFunctionDecl
    | AstModule
    | AstNativeFunctionDecl
    | AstStructFieldInitializer
    | AstType
    | AstContractInit
    | AstReceiver
    | AstImport
    | AstConstantDef
    | AstConstantDecl;

/**
 * Check if input expression is a 'path expression',
 * i.e. an identifier or a sequence of field accesses starting from an identifier.
 * @param path A path expression to check.
 * @returns An array of identifiers or null if the input expression is not a path expression.
 */
export function tryExtractPath(path: AstExpression): AstId[] | null {
    switch (path.kind) {
        case "id":
            return [path];
        case "field_access": {
            const p = tryExtractPath(path.aggregate);
            return p ? [...p, path.field] : null;
        }
        default:
            return null;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;
let nextId = 1;
export function createAstNode(src: DistributiveOmit<AstNode, "id">): AstNode {
    return Object.freeze(Object.assign({ id: nextId++ }, src));
}
export function cloneAstNode<T extends AstNode>(src: T): T {
    return { ...src, id: nextId++ };
}

export function __DANGER_resetNodeId() {
    nextId = 1;
}

export { SrcInfo };
