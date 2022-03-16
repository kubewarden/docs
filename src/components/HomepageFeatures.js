import React from 'react';

const FeatureList = [
    {
        title: 'Freedom of choice',
        description: (
            <>
                Write policies using your favorite programming language, as long as it can be compiled into WebAssembly.
            </>
        ),
    },
    {
        title: 'Feel at home',
        description: (
            <>
                Policies are regular programs. Use the tools you love, reuse your skills, libraries and best practices.
            </>
        ),
    },
    {
        title: 'Portable',
        description: (
            <>
                Policies are portable. Once built, they can run everywhere regardless of the architecture and operating system.
            </>
        ),
    },
];

function Feature({ Svg, title, description }) {
    return (
        <div className="col-md-4">
            <div className="lc-block text-center">
                <div>
                    <h3>{title}</h3>
                    <p className="font-weight-light">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <main>
            <link rel="stylesheet" type="text/css" href="../css/style-bundle.css" ></link>
            <div>
                <main id="theme-main">
                    <section className="bg-primary" style={{ paddingBottom: '150px' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 pt-5">
                                    <div className="lc-block text-light">
                                        <div>
                                            <h1 className="text-white">Kubernetes Dynamic Admission at your fingertips</h1>
                                            <h4 className="text-white">Flexible, secure and portable thanks to WebAssembly</h4>
                                        </div>
                                    </div>
                                    <div className="lc-block">
                                        <a className="btn btn-lg btn-secondary header-docs" href="/docs/intro" role="button" style={{ textTransform: 'none', float: 'left', marginRight: '20px' }}>Get Started</a>
                                    </div>
                                    <div className="lc-block">
                                        <a className="btn btn-outline-secondary" href="https://www.youtube.com/watch?v=wVBXkS1AgHg" role="button" target="_blank" rel="noopener">Watch Demo</a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="lc-block"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="lc-block">
                                        <div className="folder">
                                            <h4>Great For</h4>
                                            <div className="bg-light grid-dynamic text-center">
                                                <h5>Familiar policy writing</h5>
                                                <h5>Easy policy distribution</h5>
                                                <h5>Build and push once, run everywhere</h5>
                                                <h5>Community maintained policies</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="pt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="lc-block text-center mb-5">
                                        <div>
                                            <h2 className="h3 font-weight-bolder">What is Kubewarden</h2>
                                            <p className="font-weight-light">
                                            Kubewarden is a policy engine for Kubernetes. Its mission is to simplify the adoption of policy-as-code.<br />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="lc-block"><hr /></div>
                                    <div className="lc-block text-center mt-5 mb-5">
                                        <div>
                                            <h2 className="font-weight-bolder">Why Kubewarden?</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="row">
                                {FeatureList.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="lc-block"><hr /></div>
                                    <div className="lc-block text-center mt-5" style={{ marginBottom: '-2rem' }}>
                                        <div>
                                            <h2 className="font-weight-bolder mb-0">How it Works<br /></h2>
                                        </div>
                                    </div>
                                    <div className="lc-block mb-5"><img src="../img/how-it-works-kubewarden.svg" alt="" /></div>
                                    <p className="font-weight-light">
                                        Kubewarden integrates with Kubernetes by providing a set of Custom Resources. These Custom Resources simplify the process of enforcing policies on your cluster.<br/>
                                        Policies are implemented as WebAssembly modules and are distributed using regular container registries. They are evaluated inside of a Kubewarden component called "Policy Server".<br/>
                                        Kubewarden Policy Server is a Kubernetes Admission Webhook. Each policy is exposed using a dedicated endpoint. Policies are isolated from the host and from each other. Every single policy is confined inside of a dedicated secure sandbox.<br/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="pt-4 pb-4" style={{ marginBottom: '-170px' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1">
                                    <div className="lc-block"></div>
                                </div>
                                <div className="col-md-10 shadow bg-white pt-4 pr-4 pb-4 pl-4">
                                    <div className="lc-block text-center">
                                        <div className="white">
                                            <h2 className="font-weight-bolder mb-0">Get Started</h2>
                                                <pre>{`
$ helm repo add kubewarden https://charts.kubewarden.io,
$ kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml,
$ kubectl wait --for=condition=Available deployment --timeout=2m -n cert-manager --all,
$ helm install --create-namespace -n kubewarden kubewarden-crds kubewarden/kubewarden-crds,
$ helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller,
$ # ... and continue reading the quick start documentation.
                                                    `}
                                                </pre>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="lc-block"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="bg-primary" style={{paddingTop: '200px'}}>
                        <div className="container pb-5">
                            <div className="row">
                                <div className="col-md-5 offset-md-1">
                                    <div className="lc-block">
                                        <div>
                                            <h2 className="text-left text-white font-weight-bolder mb-1">Learn More</h2>
                                            <h3 className="font-weight-light text-white">Find out more about Kubewarden</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="lc-block learn-more-links" style={{ fontFamily: 'poppins,sans-serif' }}><div>
                                        <p className="mb-2">
                                            <a href="/docs/intro" className="font-weight-bolder rfs-10 text-white">Read the Docs</a>
                                        </p>
                                        <p className="mb-2">
                                            <a href="https://github.com/kubewarden" className="font-weight-bolder rfs-10 text-white">Visit GitHub</a>
                                        </p>
                                        <p className="mb-2">
                                            <a href="https://rancher-users.slack.com/archives/C01GKHKAG0K" className="font-weight-bolder rfs-10 text-white">Join our Slack Community</a>
                                        </p>
                                        <p className="mb-2">
                                            <a href="https://youtu.be/EKDtheJxQN4" className="font-weight-bolder rfs-10 text-white">Watch the latest meetup</a>
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </main>
    );
}
