# 00. Welcome

In this workshop you will learn about cryptographic engineering without too much
mathematics. We will be learning the cryptographic library called `libsodium`,
which is in contrast to the `crypto` module in Node.js core, which is based on
`openssl`. Libsodium is a collection of high-level cryptographic primitives
which are misuse-resitant, meaning it is hard to get wrong.

For this workshop we will be doing all out programming in Javascript on Node.js,
but since `libsodium` is written in C, we will be using the bindings called
`sodium-native`. The bindings contain prebuilts for most common platforms, so
you should not have to worry about compiling and tooling. You will also see that
the bindings are a very thin wrapper, so the API might seem a bit foreign or
very low-level, but this is a feature, as it gives you complete control over
everything that happens inside `libsodium`. As you will learn though these
exercises, having full control and complete introspection is vital to reason
about the security properties of a system. Hopefully you will come to appreciate
the simplicity of the API, despite the extra boilerplate that it causes.

In this workshop we will be building a bank, which will iteratively show you
how your bank is insecure and how we can improve that with cryptographic
primitives. We will start by focusing on securing the bank vault itself, and
then how each customer can secure their account against a malicious bank.

[Let's get started! Problem 01](01.md)
