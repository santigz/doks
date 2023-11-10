/*
Language: Mizar
Description: The Mizar Language is a formal language derived from the mathematical vernacular.
Author: Kelley van Evert <kelleyvanevert@gmail.com>
Website: http://mizar.org/language/
Category: scientific
*/

function ssh(hljs) {
  return {
    name: 'ssh',
    keywords:
      'Host Match AddKeysToAgent AddressFamily BatchMode BindAddress ' +
      'BindInterface CanonicalDomains CanonicalizeFallbackLocal ' +
      'CanonicalizeHostname CanonicalizeMaxDots CanonicalizePermittedCNAMEs ' +
      'CASignatureAlgorithms CertificateFile CheckHostIP Ciphers ' +
      'ClearAllForwardings Compression ConnectionAttempts ConnectTimeout ' +
      'ControlMaster ControlPath ControlPersist DynamicForward ' +
      'EnableSSHKeysign EscapeChar ExitOnForwardFailure FingerprintHash ' +
      'ForkAfterAuthentication ForwardAgent ForwardX11 ForwardX11Timeout ' +
      'ForwardX11Trusted GatewayPorts GlobalKnownHostsFile ' +
      'GSSAPIAuthentication GSSAPIDelegateCredentials HashKnownHosts ' +
      'HostbasedAcceptedAlgorithms HostbasedAuthentication HostKeyAlgorithms ' +
      'HostKeyAlias Hostname IdentitiesOnly IdentityAgent IdentityFile ' +
      'IgnoreUnknown Include IPQoS KbdInteractiveAuthentication ' +
      'KbdInteractiveDevices KexAlgorithms KnownHostsCommand LocalCommand ' +
      'LocalForward LogLevel LogVerbose MACs NoHostAuthenticationForLocalhost ' +
      'NumberOfPasswordPrompts PasswordAuthentication PermitLocalCommand ' +
      'PermitRemoteOpen PKCS11Provider Port PreferredAuthentications ' +
      'ProxyCommand ProxyJump ProxyUseFdpass PubkeyAcceptedAlgorithms ' +
      'PubkeyAuthentication RekeyLimit RemoteCommand RemoteForward RequestTTY ' +
      'RevokedHostKeys SecurityKeyProvider SendEnv ServerAliveCountMax ' +
      'ServerAliveInterval SessionType SetEnv StdinNull StreamLocalBindMask ' +
      'StreamLocalBindUnlink StrictHostKeyChecking SyslogFacility ' +
      'TCPKeepAlive Tunnel TunnelDevice UpdateHostKeys User ' +
      'UserKnownHostsFile VerifyHostKeyDNS VisualHostKey XAuthLocatio',
    case_insensitive: true,
    contains: [
      hljs.COMMENT('#', '$')
    ]
  };
}

export default ssh;

