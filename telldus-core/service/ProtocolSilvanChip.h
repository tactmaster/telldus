#ifndef PROTOCOLSILVANCHIP_H
#define PROTOCOLSILVANCHIP_H

#include "Protocol.h"

class ProtocolSilvanChip : public Protocol
{
public:
	int methods() const;
	virtual std::string getStringForMethod(int method, unsigned char data, Controller *controller);
};

#endif //PROTOCOLSILVANCHIP_H